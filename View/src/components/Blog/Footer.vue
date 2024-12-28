<template>
  <footer  class="footer">
    <div class="innerfooter">
    <el-button type="danger" @click="submithistory" plain class="footbutton">My Blogs</el-button>
    <el-button type="danger" @click="mycollections" plain class="footbutton">My collection</el-button>
    </div>
  </footer>
</template>

<script setup>
    import { ref } from 'vue';
    import { inject } from 'vue';
    import axios from 'axios'; // 导入 axios

    const posts = ref([]); // 用于存储展示的帖子

    // 点击“我的收藏”按钮时，显示收藏的帖子
    function mycollections() {
         if (showCollectedPosts) showCollectedPosts()
    }

    // 点击“发布历史”按钮时，显示所有的帖子
    function submithistory() {
        if (showAllPosts) showAllPosts()
    }
</script>

<style >

.innerfooter {
  background-color:rgba(243, 162, 23, 0.486);
  padding: 10px;
  left: 0;
  right: 0;
  text-align: center; 
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex; /* 使用Flexbox布局 */
  height: 7%;
}

.footbutton {
    text-align: center; 
    font-size: 1.2em; /* 增大字体大小 */
    padding: 1% 15%; /* 增加内边距 */
    min-width: 100px; /* 设置最小宽度 */
    margin: 1% 10%; /* 按钮之间的间距 */
    height: 8%;
}

.footer{
  height: 5%;
}
</style>