<template>
    <div class="content-input">
        <el-input 
        v-model="title" 
        style="width: 95%" 
        :rows="2"
        placeholder="Please input title"
        class="inputbox"
         />
        <el-input
            v-model="content"
            style="width: 95%"
            :rows="22"
            type="textarea"
            placeholder="Please input context"
            class="inputbox"/>
      <el-button type="primary" @click="submitPost" plain id="submitbutton">发布</el-button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const textarea = ref('')

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

  #submitbutton {
    margin-top: 10px;
    width: 95%;
    height: 30%;
  }


  .content-input {
    background-color: rgba(255, 255, 255, 0,001); 
    padding: 20px;
    position: fixed; /* 固定定位 */
    top: 65px; /* 距离顶部10像素 */
    left: 0px; /* 距离右侧10像素 */
    width: 25%; /* 您可以根据需要调整宽度 */
    z-index: 1000; /* 确保它在页面内容之上 */}

    .inputbox {
        width: 100%;
    }

  </style>