<template>
  <div class="app-container">
    <video autoplay muted loop class="video-background">
      <source src="../assets/img/Battel%20background.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <!-- 引入Topbar组件 -->
    <Topbar class="Topbar"/>
    <!-- 引入QuizContent组件 -->
    <div class="middle-container">
      <QuizContent />
    </div>

    <!-- 显示房间信息，当房间已创建且游戏未完成时显示 -->
    <div v-if="currentRoomId && !completed" class="room-info">
      <h2>房间已创建，房间 ID：{{ currentRoomId }}</h2>
      <!-- 开始游戏按钮，只有在游戏未开始且不在等待对手时显示 -->
      <button v-if="!gameStarted && !waitingForOpponent" class="primary-button" @click="startGame">开始游戏</button>
      <!-- 等待对手匹配的状态信息 -->
      <p v-if="waitingForOpponent" class="status-message">匹配中...</p>
    </div>

    <!-- 倒计时，当游戏已开始且未完成时显示 -->
    <div v-if="gameStarted && !completed && timer > 0" class="timer">
      <h2>倒计时: {{ timer }} 秒</h2>
    </div>

    <!-- 题目区域，当游戏已开始且未完成时显示 -->
    <div v-if="gameStarted && !completed" class="questions-section">
      <h2>游戏开始!</h2>
      <!-- 循环渲染每个问题 -->
      <div v-for="(question, index) in questions" :key="index" class="question-card">
        <p class="question-text">{{ question.question }}</p>
        <!-- 循环渲染每个问题的选项 -->
        <div class="options" v-for="(option, optIndex) in question.options" :key="optIndex">
          <input type="radio" :id="'option' + index + optIndex" :value="option" v-model="answers[index]" />
          <label :for="'option' + index + optIndex">{{ option }}</label>
        </div>
      </div>
      <!-- 提交答案按钮 -->
      <button class="submit-button" @click="submitAllAnswers">提交所有答案</button>
    </div>

    <!-- 游戏完成后的结果区域 -->
    <div v-if="completed" class="result-section">
      <h2>答题已完成！</h2>
      <p>总用时：{{ completionTime }} 秒</p>
      <p>正确率：{{ (correctAnswersCount / questions.length * 100).toFixed(2) }}%</p>
    </div>

    <!-- 错误信息显示区域 -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import Topbar from '../components/Topbar.vue';  

export default {
  components: {
    Topbar  // 注册Topbar组件
  },
  data() {
    return {
      roomIdInput: '', // 用户输入的房间ID
      currentRoomId: '', // 当前房间ID
      socket: null, // socket连接实例
      questions: [], // 存储从服务器获取的题目
      answers: [], // 存储用户的答案
      timer: 0, // 倒计时
      gameStarted: false, // 标识游戏是否开始
      waitingForOpponent: false, // 标识是否在等待对手
      errorMessage: '', // 错误信息
      correctAnswersCount: 0, // 正确答案数量
      completed: false, // 标识游戏是否完成
      completionTime: 0, // 游戏完成时间
      startTime: null, // 游戏开始时间
    };
  },
  mounted() {
    // 初始化Socket.io连接
    this.socket = io('http://localhost:3001');

    // 监听房间创建事件
    this.socket.on('roomCreated', (roomId) => {
      this.currentRoomId = roomId; // 更新当前房间ID
      this.errorMessage = ''; // 清空错误信息
    });

    // 监听游戏开始事件
    this.socket.on('gameStarted', (questions) => {
      this.questions = questions; // 接收问题列表
      this.answers = new Array(questions.length).fill(''); // 初始化用户答案数组
      this.gameStarted = true; // 设置游戏已开始
      this.waitingForOpponent = false; // 不再等待对手
      this.errorMessage = ''; // 清空错误信息
      this.startTime = new Date(); // 记录游戏开始时间
    });

    // 监听等待对手事件
    this.socket.on('waitingForOpponent', () => {
      this.waitingForOpponent = true; // 设置等待对手标识
    });

    // 监听倒计时事件
    this.socket.on('timer', (time) => {
      this.timer = time; // 更新倒计时
    });

    // 监听时间到事件
    this.socket.on('timeUp', () => {
      this.errorMessage = '时间到！游戏结束！'; // 显示时间到提示
      this.gameStarted = false; // 设置游戏未开始
      this.timer = 0; // 重置倒计时
    });

    // 监听答案提交事件
    this.socket.on('answerSubmitted', ({ playerId, answer }) => {
      console.log(`Player ${playerId} submitted answer: ${answer}`); // 控制台打印提交信息
    });

    // 监听错误信息事件
    this.socket.on('error', (message) => {
      this.errorMessage = message; // 显示错误信息
    });
  },
  methods: {
    // 创建房间方法
    createRoom() {
      this.socket.emit('createRoom', this.roomIdInput); // 向服务器发送创建房间请求
    },
    // 加入房间方法
    joinRoom() {
      this.socket.emit('joinRoom', this.roomIdInput); // 向服务器发送加入房间请求
      this.currentRoomId = this.roomIdInput; // 更新当前房间ID
    },
    // 开始游戏方法
    startGame() {
      this.socket.emit('startGame', this.currentRoomId); // 向服务器发送开始游戏请求
    },
    // 提交所有答案方法
    submitAllAnswers() {
      // 获取正确答案数组
      const correctAnswers = this.questions.map(q => q.answer);
      // 统计正确答案数量
      this.correctAnswersCount = this.answers.reduce((count, answer, index) => {
        return answer === correctAnswers[index] ? count + 1 : count;
      }, 0);

      // 计算完成时间
      const endTime = new Date();
      this.completionTime = ((endTime - this.startTime) / 1000).toFixed(2);

      // 更新状态
      this.completed = true;
      this.gameStarted = false;

      // 向服务器提交答案
      this.socket.emit('submitAnswer', this.currentRoomId, this.answers);
    },
  },
};
</script>

<style scoped>

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

/* 标题样式 */
h1 {
  text-align: center;
  color: #333;
}

/* 输入区域样式 */
.input-section {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

/* 输入框样式 */
input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

/* 按钮样式 */
.primary-button, .submit-button {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #28a745;
  color: white;
  transition: background-color 0.3s;
}

.primary-button:hover, .submit-button:hover {
  background-color: #bd3559;
}

/* 其他区域样式 */
.room-info, .timer, .questions-section, .error-message {
  margin-bottom: 20px;
  text-align: center;
}

/* 问题卡片样式 */
.question-card {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 问题文本样式 */
.question-text {
  font-weight: bold;
  margin-bottom: 10px;
}

/* 选项样式 */
.options {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* 错误信息样式 */
.error-message {
  color: red;
}

/* 状态信息样式 */
.status-message {
  color: #555;
  font-style: italic;
}

.Topbar {
  position: fixed;
  height: 50px;
}

</style>
