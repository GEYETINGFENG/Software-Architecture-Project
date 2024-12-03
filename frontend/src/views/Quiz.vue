<template>
  <div class="app-container">
    <!-- 引入Topbar组件 -->
    <Topbar />

    <!-- 引入QuizContent组件 -->
    <QuizContent />
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
</style>
