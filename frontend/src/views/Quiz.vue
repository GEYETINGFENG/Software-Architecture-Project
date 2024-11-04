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
      <button v-if="!gameStarted" @click="startGame">开始游戏</button> <!-- 新增的开始游戏按钮 -->
    </div>

    <div v-if="gameStarted">
      <h2>游戏开始!</h2>
      <div v-for="(question, index) in questions" :key="index">
        <p>{{ question.question }}</p>
        <input v-model="answers[index]" placeholder="输入你的答案" />
        <button @click="submitAnswer(index)">提交答案</button>
      </div>
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
      answers: [],
      gameStarted: false,
      errorMessage: '',
    };
  },
  mounted() {
    this.socket = io('http://localhost:3001'); // 连接到独立的 Socket.IO 服务器

    // 监听房间创建成功的消息
    this.socket.on('roomCreated', (roomId) => {
      this.currentRoomId = roomId; // 更新当前房间 ID
      this.errorMessage = ''; // 清空错误信息
    });

    this.socket.on('gameStarted', (questions) => {
      this.questions = questions;
      this.answers = new Array(questions.length).fill('');
      this.gameStarted = true;
      this.errorMessage = '';
    });

    this.socket.on('answerSubmitted', ({ playerId, answer }) => {
      console.log(`Player ${playerId} submitted answer: ${answer}`);
    });

    this.socket.on('playerJoined', (playerId) => {
      console.log(`Player ${playerId} joined the room`);
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
      this.currentRoomId = this.roomIdInput; // 直接显示加入的房间 ID
    },
    startGame() {
      this.socket.emit('startGame', this.currentRoomId); // 发送 startGame 事件到服务器
    },
    submitAnswer(index) {
      this.socket.emit('submitAnswer', this.currentRoomId, this.answers[index]);
      this.answers[index] = ''; // 提交后清空输入框
    },
  },
};
</script>

<style scoped>
/* 添加一些样式 */
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
