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
import Topbar from '../components/Topbar.vue';
import QuizStart from '../components/Quiz/QuizStart.vue';
import QuizAnswering from '../components/Quiz/QuizAnswering.vue';



export default {
  components: {
    Topbar,
    QuizAnswering,
    QuizStart
  },
  methods: {
    startGame(newValue) {
      this.gameStarted = newValue;
    },
    getRoomID(roomID) {
      this.roomID = roomID;
    }
  },
  data() {
    return {
      gameStarted: false,
      roomID: ''
    };
  }

};
</script>

<style scoped>
/* 设置整体布局 */
.app-container {
  display: flex;
  flex-direction: column; /* 纵向布局，Topbar在上，QuizContent在下 */
  min-height: 100vh; /* 让容器的最小高度为视口高度，确保布局填满页面 */
}

.video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  opacity: 0.5;
  z-index: -100;
  background-size: cover;
  overflow: hidden;
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
