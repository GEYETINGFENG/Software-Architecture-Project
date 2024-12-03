<template>
    <div class="forum">
      <!-- 帖子列表 -->
      <div class="posts">
        <h2>帖子列表</h2>
        <ul>
          <li v-for="post in posts" :key="post.id">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-content">{{ post.content }}</div>
          </li>
        </ul>
      </div>
  
      <!-- 发帖表单 -->
      <div class="new-post-form">
        <h2>发帖</h2>
        <form @submit.prevent="submitPost">
          <input v-model="newPost.title" placeholder="标题" required />
          <textarea v-model="newPost.content" placeholder="内容" required></textarea>
          <button type="submit">发布</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: [],
        newPost: {
          title: '',
          content: ''
        }
      };
    },
    created() {
      this.fetchPosts();
    },
    methods: {
      async fetchPosts() {
        try {
          const response = await axios.get('http://localhost:3001/api/articles');
          this.posts = response.data;
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
      async submitPost() {
        try {
          const response = await axios.post('http://localhost:3001/api/articles', {
            title: this.newPost.title,
            content: this.newPost.content
          });
          console.log('发帖成功:', response.data);
          this.newPost.title = '';
          this.newPost.content = '';
          this.fetchPosts(); // 重新获取帖子列表
        } catch (error) {
          console.error('发帖失败:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .forum {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .posts {
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  .post-title {
    font-weight: bold;
  }
  
  .new-post-form {
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  input, textarea {
    width: 100%;
    margin-bottom: 10px;
  }
  
  button {
    padding: 5px 10px;
  }
  </style>