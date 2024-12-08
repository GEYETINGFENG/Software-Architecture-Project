<template>
  <div class="content-input">
    <el-input 
      v-model="title" 
      :rows="1"
      placeholder="Please input title"
      class="inputboxtitle"
    />
    <el-input
      v-model="content"
      :rows="10"
      type="textarea"
      placeholder="Please input content"
      class="inputbox"
    />
    <el-button type="primary" @click="submitPost" id="submitbutton">POST</el-button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const title = ref('');
const content = ref('');

// 发布帖子逻辑

</script>

<style scoped>
.content-input {
  background-color: #fefdfd59; 
  padding: 1.5rem;
  position: fixed;
  top: 4rem;
  left: 1rem;
  width: 30%;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 80%; /* 保证高度自适应 */
  box-sizing: border-box;
  overflow-y: auto; /* 当内容超过最大高度时显示滚动条 */
}

.inputbox {
  width: 100%;
  margin-bottom: 1.5rem;
  height: auto;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.inputboxtitle{
  width: 100%;
  margin-bottom: 1.5rem;
  height: auto;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.inputbox:focus {
  border-color: #409EFF;
}

#submitbutton {
  width: 100%; 
  margin-top: 1rem;
  height: 2.5rem;
  font-size: 1.1rem;
  border-radius: 4px;
  background-color: #409EFF;
  color: white;
  border: none;
  transition: background-color 0.3s;
  box-sizing: border-box;
}

#submitbutton:hover {
  background-color: #66b1ff;
}

@media (max-width: 1024px) {
  .content-input {
    width: 40%;
    left: 2%;
  }
  #submitbutton {
    font-size: 1rem;
    height: 2.2rem;
  }
}

@media (max-width: 768px) {
  .content-input {
    width: 80%;
    left: 10%;
  }
  #submitbutton {
    font-size: 1rem;
    height: 2rem;
  }
}

@media (max-width: 480px) {
  .content-input {
    width: 90%;
    left: 5%;
  }
  #submitbutton {
    font-size: 0.9rem;
    height: 1.8rem;
  }
}
</style>