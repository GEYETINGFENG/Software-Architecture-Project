<template>
  <div class="app-container">
    <video autoplay muted loop class="video-background">
      <source src="../assets/img/Battel%20background.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <!-- 引入Topbar组件 -->
    <Topbar />
    <!-- 引入QuizContent组件 -->
    <div class="middle-container">
      <QuizContent />
    </div>
  </div>
</template>



<script>
import Topbar from '../components/Topbar.vue';
import QuizContent from '../components/QuizContent.vue';

export default {
  components: {
    Topbar,
    QuizContent
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

.middle-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
