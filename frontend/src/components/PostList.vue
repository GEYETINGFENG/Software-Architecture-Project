<template>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.context }}</p>
        <h6>total {{ post.likes }} likes</h6>
        <el-button type="success" round @click="likePost(post.id)">点赞</el-button>
        <el-button type="warning" round @click="collectPost(post.id)">收藏</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';  

  const posts = ref([
    { articleId: 1, title: 'Post 1', context: 'Content of post 1', likes: 0 },
    { articleId: 2, title: 'Post 2', context: 'Content of post 2', likes: 0 },
    { articleId: 3, title: 'Post 3', context: 'Content of post 2', likes: 666 },
    { articleId: 4, title: 'Post 4', context: 'Content of post 2', likes: 0 },
    { articleId: 5, title: 'Post 5', context: 'Content of post 2', likes: 0 },
    { articleId: 6, title: 'Post 6', context: 'Content of post 2', likes: 0 },
    { articleId: 7, title: 'Post 7', context: 'Content of post 2', likes: 0 },
    { articleId: 8, title: 'Post 8', contet: 'Content of post 2', likes: 0 },
  ]);
  

      function likePost(id) {
    const post = posts.value.find(p => p.id === id);
    if (post) post.likes++;
  }


  </script>
  
  <style >

  .post-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .post {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 30%;
  }
  </style>