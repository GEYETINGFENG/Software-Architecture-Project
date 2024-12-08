<template>
  <div class="app-container">

    <video autoplay muted loop class="video-background">
      <source src="../assets/img/Battel%20background.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <Topbar />
    <QuizStart :socket="socket"
               @game-started="startGame"
               @roomID="getRoomID"
               v-if="!gameStarted"
               :username="username"/>
    <QuizAnswering v-if="gameStarted && !gameCompleted"
                   :socket="socket"
                   :roomID="roomID"
                   @game-completed="getGameCompleted"
                   :username="username"
                   @answeredQuestions="getAnsweredQuestions"
                   @userTimes="getUserTimes"
                   :stopTimer="stopTimer"
    />
    <QuizResult v-if="gameCompleted"
                :socket="socket"
                :username="username"
                :user_result="answeredQuestions"
                :userTimes="userTimes"
                @onConfirmButtonClick="resetQuiz"
                :roomID="roomID"
    />

  </div>
</template>

<script>
import Topbar from '../components/Topbar.vue';
import QuizStart from '../components/Quiz/QuizStart.vue';
import QuizAnswering from '../components/Quiz/QuizAnswering.vue';
import QuizResult from '../components/Quiz/QuizResult.vue';

import { io } from 'socket.io-client';
import axios from 'axios';

export default {
  components: {
    Topbar,
    QuizAnswering,
    QuizStart,
    QuizResult
  },
  data() {
    return {
      gameStarted: false,
      gameCompleted: false,
      roomID: '',
      username: null,
      answeredQuestions: [],
      socket: null,
      userTimes:{},
      stopTimer: false
    };
  },
  methods: {
    startGame(newValue) {
      this.gameStarted = newValue;
      this.socket.emit('getQuestions', this.roomID);
    },
    getRoomID(roomID) {
      this.roomID = roomID;
    },
    getGameCompleted(newValue) {
      this.gameCompleted = newValue;
    },
    getAnsweredQuestions(newValue) {
      console.log('getAnsweredQuestions1'+ newValue);
      this.answeredQuestions = newValue;
    },
    getUserTimes(newValue) {
      this.userTimes = newValue;
    },
    resetQuiz() {
      this.gameCompleted = false;
      this.gameStarted = false;
    },
    async fetchUserData() {
      try {
        const token = localStorage.getItem('jwt-token'); // 从本地存储获取 JWT
        if (!token) {
          console.error('No JWT token found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:3000/api/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.username=response.data.user.username
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    },
  },
  mounted() {
    this.fetchUserData();

    this.socket.on('AllQuestionCompleted', (username, questions,timer) => {
      if (username === this.username) {
        this.stopTimer = true;
        this.userTimes = timer;

        this.answeredQuestions = questions;
        this.gameCompleted = true;

      }else{
        this.userTimes = timer;
        this.answeredQuestions = questions;
      }
    });
  },
  beforeMount() {
    this.socket = io('http://localhost:3001');
    console.log(this.socket);
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

</style>
