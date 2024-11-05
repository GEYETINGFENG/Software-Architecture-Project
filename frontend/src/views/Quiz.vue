<template>
  <div>
    <h1>双人答题对战</h1>
    <div>
      <input v-model="roomIdInput" placeholder="房间ID" />
      <button @click="createRoom">创建房间</button>
      <button @click="joinRoom">加入房间</button>
    </div>

    <!-- 显示当前房间 ID -->
    <div v-if="currentRoomId">
      <h2>房间已创建，房间 ID：{{ currentRoomId }}</h2>
      <button v-if="!gameStarted && !waitingForOpponent" @click="startGame">开始游戏</button>
      <p v-if="waitingForOpponent">匹配中...</p>
    </div>

    <!-- 显示倒计时 -->
    <div v-if="gameStarted && timer > 0">
      <h2>倒计时: {{ timer }} 秒</h2>
    </div>

    <!-- 显示题目 -->
    <div v-if="gameStarted">
      <h2>游戏开始!</h2>
      <div v-for="(question, index) in questions" :key="index">
        <p>{{ question.question }}</p>
        <div v-for="(option, optIndex) in question.options" :key="optIndex">
          <input type="radio" :id="'option' + index + optIndex" :value="option" v-model="answers[index]" />
          <label :for="'option' + index + optIndex">{{ option }}</label>
        </div>
      </div>

      <!-- 统一提交所有答案的按钮 -->
      <button @click="submitAllAnswers">提交所有答案</button>
    </div>

    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      roomIdInput: '', // 用户输入的房间 ID
      currentRoomId: '', // 当前连接的房间 ID
      socket: null,
      questions: [],
      answers: [], // 存储所有题目的答案
      timer: 0, // 倒计时
      gameStarted: false,
      waitingForOpponent: false,
      errorMessage: '',
      correctAnswersCount: 0, // 正确答案计数
    };
  },
  mounted() {
    this.socket = io('http://localhost:3001'); // 连接到独立的 Socket.IO 服务器

    this.socket.on('roomCreated', (roomId) => {
      this.currentRoomId = roomId;
      this.errorMessage = '';
    });

    this.socket.on('gameStarted', (questions) => {
      this.questions = questions;
      this.answers = new Array(questions.length).fill(''); // 初始化答案数组
      this.gameStarted = true;
      this.waitingForOpponent = false;
      this.errorMessage = '';
    });

    this.socket.on('waitingForOpponent', () => {
      this.waitingForOpponent = true;
    });

    // 倒计时事件
    this.socket.on('timer', (time) => {
      this.timer = time;
    });

    // 时间到事件
    this.socket.on('timeUp', () => {
      this.errorMessage = '时间到！游戏结束！';
      this.gameStarted = false;
      this.timer = 0;
    });

    this.socket.on('answerSubmitted', ({ playerId, answer }) => {
      console.log(`Player ${playerId} submitted answer: ${answer}`);
    });

    this.socket.on('error', (message) => {
      this.errorMessage = message;
    });
  },
  methods: {
    createRoom() {
      this.socket.emit('createRoom', this.roomIdInput);
    },
    joinRoom() {
      this.socket.emit('joinRoom', this.roomIdInput);
      this.currentRoomId = this.roomIdInput;
    },
    startGame() {
      this.socket.emit('startGame', this.currentRoomId);
    },
    submitAllAnswers() {
      // 提交所有答案，计算正确答案的数量
      const correctAnswers = this.questions.map(q => q.answer);
      this.correctAnswersCount = this.answers.reduce((count, answer, index) => {
        return answer === correctAnswers[index] ? count + 1 : count;
      }, 0);

      // 将答案发送到服务器
      this.socket.emit('submitAnswer', this.currentRoomId, this.answers);

      // 显示提交结果
      alert(`答题完成！正确答案数：${this.correctAnswersCount} / ${this.questions.length}`);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

input {
  margin: 10px;
}

button {
  margin: 5px;
}
</style>
