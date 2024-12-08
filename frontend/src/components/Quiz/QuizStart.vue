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

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        tempRoomId: '',
        RoomId: '',

        getReady: false,
        gameStarted: false,

        errorMessage: '',
      };
    },
    watch: {
      gameStarted(newValue) {
        this.$emit('roomID', this.RoomId);
        this.$emit('game-started', newValue);
      },
    },
    props: {
      username: {
        type: String,
        required: true,
      },
      socket: {
        required: true,
      }
    },
    mounted() {
  
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
  
      this.socket.on('error', (message) => {
        this.errorMessage = message;
      });
    },
    methods: {
      validateRoomId(roomId) {
        const regex = /^[1-9]\d{2}$/;
        return regex.test(roomId);
      },
      createRoom() {
        if (this.validateRoomId(this.tempRoomId)) {
          this.socket.emit('createRoom', this.username, this.tempRoomId);
        } else {
          this.errorMessage = 'Room ID must be a three-digit positive integer';
        }
      },
      joinRoom() {
        if (this.validateRoomId(this.tempRoomId)) {
          this.socket.emit('joinRoom', this.username, this.tempRoomId);
        } else {
          this.errorMessage = 'Room ID must be a three-digit positive integer';
        }
      },
      startGame() {
        this.socket.emit('startGame', this.RoomId);
        this.getReady = true;
      },
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
  