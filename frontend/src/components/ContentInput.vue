<template>
  <div class="content-input">
    <el-input 
      v-model="title" 
      :rows="2"
      placeholder="Please input title"
      class="inputbox"
    />
    <el-input
      v-model="content"
      :rows="17"
      type="textarea"
      placeholder="Please input content"
      class="inputbox"
    />
    <el-button type="primary" @click="submitPost" id="submitbutton">发布</el-button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const title = ref('');
const content = ref('');

// 发布帖子逻辑
async function submitPost() {
  // 确保标题和内容不为空
  if (!title.value || !content.value) {
    alert('Please fill in both title and content.');
    return;
  }

  // 创建新帖子对象
  const newPost = {
    title: title.value,
    context: content.value,
    likes: 0 // 初始点赞数为0
  };

  try {
    // 向后端发送 POST 请求
    const response = await axios.post('http://yourapi.com/posts', newPost);

    // 如果请求成功，提示用户
    if (response.status === 200) {
      alert('Post published successfully!');
      // 清空输入框
      title.value = '';
      content.value = '';
    } else {
      alert('Failed to publish the post.');
    }
  } catch (error) {
    // 捕获错误并提示
    console.error('Error posting data:', error);
    alert('There was an error posting your content. Please try again later.');
  }
}
</script>

<style scoped>
.content-input {
  background-color: #fefdfd59; 
  padding: 20px;
  position: fixed;
  top: 65px;
  left: 10px; /* 增加一点左侧间距，避免紧贴页面边缘 */
  width: 27%; /* 增大输入框宽度 */
  max-width: 400px; /* 限制最大宽度，适应大屏幕 */
  z-index: 1000;
  border-radius: 8px; /* 圆角效果 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 增加阴影效果，提升视觉效果 */
}

.inputbox {
  width: 90%; /* 确保输入框占满父容器宽度 */
  margin-bottom: 15px; /* 增加输入框之间的间距 */
  height: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px; /* 增加字体大小 */
  box-sizing: border-box; /* 包含padding和border */
  transition: border-color 0.3s; /* 输入框边框过渡效果 */
}

.inputbox:focus {
  border-color: #409EFF; /* 焦点时改变输入框边框颜色 */
}

#submitbutton {
  width: 90%; /* 使按钮和输入框宽度统一 */
  margin-top: 10px;
  height: 45px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #409EFF;
  color: white;
  border: none;
  transition: background-color 0.3s; /* 按钮的过渡效果 */
  box-sizing: border-box; /* 包含padding */
}

#submitbutton:hover {
  background-color: #66b1ff; /* 悬停时按钮颜色变化 */
}

@media (max-width: 768px) {
  .content-input {
    width: 90%; /* 小屏幕下宽度调整 */
    left: 5%; /* 增加左右间距，避免边缘过近 */
  }
  #submitbutton {
    font-size: 14px; /* 调整按钮字体大小 */
    height: 40px; /* 调整按钮高度 */
  }
}
</style>
