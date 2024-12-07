<template>
    <div class="container">
      <h1>双人答题对战</h1>
  
      <!-- 输入和按钮区域 -->
      <div class="input-section">
        <input v-model="tempRoomId" placeholder="Room ID" />
        <button class="primary-button" @click="createRoom">创建房间</button>
        <button class="primary-button" @click="joinRoom">加入房间</button>
      </div>
  
      <!-- 创建或加入房间之后 -->
      <div v-if="RoomId" class="room-info">
        <!-- 只有在房间ID且游戏未完成时才显示房间信息 -->
        <div>
          <h2>Enter Room {{ RoomId }} Successfully!</h2>
          <button class="primary-button" v-if="!getReady" @click="startGame">开始游戏</button>
        </div>
          <p v-if="getReady" class="status-message">匹配中...</p>
      </div>


<!--      &lt;!&ndash; 倒计时 &ndash;&gt;-->
<!--      <div v-if="gameStarted && !completed && timer > 0" class="timer">-->
<!--        <h2>倒计时: {{ timer }} 秒</h2>-->
<!--      </div>-->
<!--  -->
<!--      &lt;!&ndash; 题目区域 &ndash;&gt;-->
<!--      <div v-if="gameStarted && !completed" class="questions-section">-->
<!--        <h2>游戏开始!</h2>-->
<!--        <div v-for="(question, index) in questions" :key="index" class="question-card">-->
<!--          <p class="question-text">{{ question.question }}</p>-->
<!--          <div class="options" v-for="(option, optIndex) in question.options" :key="optIndex">-->
<!--            <input type="radio" :id="'option' + index + optIndex" :value="option" v-model="answers[index]" />-->
<!--            <label :for="'option' + index + optIndex">{{ option }}</label>-->
<!--          </div>-->
<!--        </div>-->
<!--        <button class="submit-button" @click="submitAllAnswers">提交所有答案</button>-->
<!--      </div>-->
<!--  -->
<!--      &lt;!&ndash; 游戏完成后的结果区域 &ndash;&gt;-->
<!--      <div v-if="completed" class="result-section">-->
<!--        <h2>答题已完成！</h2>-->
<!--        <p>总用时：{{ completionTime }} 秒</p>-->
<!--        <p>正确率：{{ (correctAnswersCount / questions.length * 100).toFixed(2) }}%</p>-->
<!--      </div>-->
  
      <!-- 错误信息 -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import { io } from 'socket.io-client';

  export default {
    data() {
      return {
        socket: null,

        tempRoomId: '',
        RoomId: '',

        getReady: false,
        gameStarted: false,

        errorMessage: '',
      };
    },
    watch: {
      gameStarted(newValue) {
        this.$emit('game-started', newValue);
        this.$emit('roomID', this.RoomId);
      },

    },
    mounted() {
      this.socket = io('http://localhost:3001');
  
      this.socket.on('roomCreated', (roomId) => {
        this.RoomId = roomId;
        this.errorMessage = '';
      });

      this.socket.on('playerJoined', (roomId) => {
        this.RoomId = roomId;
        this.errorMessage = '';
      });
  
      this.socket.on('gameStarted', () => {
        this.errorMessage = '';
        this.gameStarted = true;
      });
  
      // this.socket.on('OpponentMatch', () => {
      //   this.isOpponentMatch = true;
      // });
  
      // this.socket.on('timer', (time) => {
      //   this.timer = time;
      // });
      //
      // this.socket.on('timeUp', () => {
      //   this.errorMessage = '时间到！游戏结束！';
      //   this.gameStarted = false;
      //   this.timer = 0;
      // });
      //
      // this.socket.on('answerSubmitted', ({ playerId, answer }) => {
      //   console.log(`Player ${playerId} submitted answer: ${answer}`);
      // });
  
      this.socket.on('error', (message) => {
        this.errorMessage = message;
      });
    },

    methods: {
      createRoom() {
        this.socket.emit('createRoom', this.tempRoomId);
      },
      joinRoom() {
        this.socket.emit('joinRoom', this.tempRoomId);
      },
      startGame() {
        this.socket.emit('startGame', this.RoomId);
        this.getReady = true;
      },
      // submitAllAnswers() {
      //   const correctAnswers = this.questions.map(q => q.answer);
      //   this.correctAnswersCount = this.answers.reduce((count, answer, index) => {
      //     return answer === correctAnswers[index] ? count + 1 : count;
      //   }, 0);
      //   const endTime = new Date();
      //   this.completionTime = ((endTime - this.startTime) / 1000).toFixed(2);
      //   this.completed = true;
      //   this.gameStarted = false;
      //   this.socket.emit('submitAnswer', this.currentRoomId, this.answers);
      // },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin:200px auto;
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

  .primary-button {
   padding: 10px 15px;
   font-size: 16px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   background-color: #28a745;
   color: white;
   transition: background-color 0.3s;
  }
  .primary-button:hover {
   background-color: #bd3559;
  }
  .room-info, .error-message {
   margin-bottom: 20px;
   text-align: center;
  }

  /*
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
    */

 .error-message {
   color: red;
 }
 .status-message {
   color: #555;
   font-style: italic;
 }
</style>
  