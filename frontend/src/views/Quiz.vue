<template>
  <div class="app-container">
    <video autoplay muted loop class="video-background">
      <source src="../assets/img/Battel%20background.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <!-- 引入Topbar组件 -->
    <Topbar />
    <!-- 引入QuizContent组件 -->
    <QuizStart @game-started="startGame" @roomID="getRoomID" v-if="!gameStarted"/>
    <QuizAnswering v-if="gameStarted" :roomID="roomID"/>
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

</style>
