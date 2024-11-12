<template>
  <div class="container">
    <h1>双人答题对战</h1>
    <div class="input-section">
      <input v-model="roomIdInput" placeholder="房间ID" />
      <button class="primary-button" @click="createRoom">创建房间</button>
      <button class="primary-button" @click="joinRoom">加入房间</button>
    </div>

    <div v-if="currentRoomId && !completed" class="room-info">
      <h2>房间已创建，房间 ID：{{ currentRoomId }}</h2>
      <button v-if="!gameStarted && !waitingForOpponent" class="primary-button" @click="startGame">开始游戏</button>
      <p v-if="waitingForOpponent" class="status-message">匹配中...</p>
    </div>

    <div v-if="gameStarted && !completed && timer > 0" class="timer">
      <h2>倒计时: {{ timer }} 秒</h2>
    </div>

    <div v-if="gameStarted && !completed" class="questions-section">
      <h2>游戏开始!</h2>
      <div v-for="(question, index) in questions" :key="index" class="question-card">
        <p class="question-text">{{ question.question }}</p>
        <div class="options" v-for="(option, optIndex) in question.options" :key="optIndex">
          <input type="radio" :id="'option' + index + optIndex" :value="option" v-model="answers[index]" />
          <label :for="'option' + index + optIndex">{{ option }}</label>
        </div>
      </div>
      <button class="submit-button" @click="submitAllAnswers">提交所有答案</button>
    </div>

    <div v-if="completed" class="result-section">
      <h2>答题已完成！</h2>
      <p>总用时：{{ completionTime }} 秒</p>
      <p>正确率：{{ (correctAnswersCount / questions.length * 100).toFixed(2) }}%</p>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      roomIdInput: '',
      currentRoomId: '',
      socket: null,
      questions: [],
      answers: [],
      timer: 0,
      gameStarted: false,
      waitingForOpponent: false,
      errorMessage: '',
      correctAnswersCount: 0,
      completed: false,
      completionTime: 0,
      startTime: null,
    };
  },
  mounted() {
    this.socket = io('http://localhost:3001');

    this.socket.on('roomCreated', (roomId) => {
      this.currentRoomId = roomId;
      this.errorMessage = '';
    });

    this.socket.on('gameStarted', (questions) => {
      this.questions = questions;
      this.answers = new Array(questions.length).fill('');
      this.gameStarted = true;
      this.waitingForOpponent = false;
      this.errorMessage = '';
      this.startTime = new Date(); // 记录开始时间
    });

    this.socket.on('waitingForOpponent', () => {
      this.waitingForOpponent = true;
    });

    this.socket.on('timer', (time) => {
      this.timer = time;
    });

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
      const correctAnswers = this.questions.map(q => q.answer);
      this.correctAnswersCount = this.answers.reduce((count, answer, index) => {
        return answer === correctAnswers[index] ? count + 1 : count;
      }, 0);

      // 计算完成时间
      const endTime = new Date();
      this.completionTime = ((endTime - this.startTime) / 1000).toFixed(2);

      // 更新状态
      this.completed = true;
      this.gameStarted = false;

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

h1 {
  text-align: center;
  color: #333;
}

.input-section {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

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
  background-color: #218838;
}

.room-info, .timer, .questions-section, .error-message {
  margin-bottom: 20px;
  text-align: center;
}

.question-card {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-weight: bold;
  margin-bottom: 10px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.error-message {
  color: red;
}

.status-message {
  color: #555;
  font-style: italic;
}
</style>
