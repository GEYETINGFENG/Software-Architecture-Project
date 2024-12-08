<template>
  <el-scrollbar class="scrollbar">
    <div
      v-for="post in posts"
      :key="post.articleId"
      class="post"
      :class="{ 'post-fullscreen': currentPostId === post.articleId }"
      @click="viewPost(post.articleId)"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.context }}</p>
      <h6>total {{ post.likes }} likes</h6>
        <el-button type="success" round @click.stop="likePost(post.articleId)" class="funbutton">Like</el-button>
        <el-button type="warning" round @click.stop="collectPost(post.articleId)" class="funbutton">Favorite</el-button>

      <!-- 评论区域 -->
      <transition name="fade">
        <div v-if="currentPostId === post.articleId" class="comment-section">
          <div class="comment-input">
            <el-input
              type="textarea"
              v-model="post.newComment"
              placeholder="Write your comment..."
              class="inputbox"
            />
            <el-button type="primary" round @click="submitComment(post.articleId)" class="submit-button">Post Comment</el-button>
          </div>
          <!-- 显示评论 -->
          <div v-for="comment in post.comments" :key="comment.id" class="comment">
            <p>{{ comment.content }}</p>
          </div>
          <!-- 退出按钮 -->
          <el-button type="danger" round @click.stop="viewPost(-1)">EXIT</el-button>
        </div>
      </transition>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([
  { articleId: 1, title: 'Post 1', context: 'okjhgfds1qwe', likes: 0, comments: [], newComment: '' },
  { articleId: 2, title: 'Post 2', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
  { articleId: 3, title: 'Post 3', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
  { articleId: 4, title: 'Post 4', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
  { articleId: 5, title: 'Post 5', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
  { articleId: 6, title: 'Post 6', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
  { articleId: 7, title: 'Post 7', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
  { articleId: 8, title: 'Post 8', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
  { articleId: 9, title: 'Post 9', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
  { articleId: 10, title: 'Post 10', context: 'Content of post 2', likes: 0, comments: [], newComment: '' },
]);

const currentPostId = ref(null);

function likePost(id) {
  const post = posts.value.find(p => p.articleId === id);
  if (post) post.likes++;
}

function collectPost(id) {
  //收藏帖子的逻辑
}

function viewPost(id) {
  // 只有点击退出按钮时退出弹窗
  if (id !== null) {
    currentPostId.value = id;
  }
}

function submitComment(postId) {
  const post = posts.value.find(p => p.articleId === postId);
  if (post) {
    const newComment = {
      id: Date.now(),
      content: post.newComment,
    };
    post.comments.push(newComment);
    post.newComment = '';
  }
}
</script>

<style>


.funbutton{
  width: 100%;
}

/* 外层滚动容器样式 */
.scrollbar {
  width: auto;
  padding: 2%;
  background-color: #ffffff96;
  border-radius: 8px;
  height: 250%;
}

/* 帖子列表样式 */
.post {
  border: 1px solid #e0e0e0;
  padding: 20%;
  margin: 15px 0;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.post:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 放大后的帖子样式 */
.post-fullscreen {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 35%;
  right: 15%;
  width: 60%;
  height: auto;
  z-index: 10;
  background-color: hsl(50, 91%, 48%);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transform: scale(1);
  display: flex;
  flex-direction: column;
  animation: postZoomIn 0.3s ease-in-out;
}

/* 放大后的标题和内容 */
.post-fullscreen h2 {
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
}

.post-fullscreen p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.post-fullscreen ~ .post {
  display: none;
}

/* 评论区域样式 */
.comment-section {
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(240, 177, 17, 0.5);
  border-radius: 8px;
}

.comment-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.comment-input .el-input__inner {
  margin-bottom: 10px;
  height: 25%;
  font-size: 14px;
}

.comment-input {
  align-self: flex-end;
}

.comment {
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  transition: all 0.3s ease;
}

.comment:hover {
  background-color: #f0f0f0;
}

.inputbox {
  height: 100px;
  font-size: 20px;
}

.submit-button {
  margin-top: 10px;
}

/* 放大效果动画 */
@keyframes postZoomIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.post {
  border: 1px solid #e0e0e0;
  padding: 5%;
  margin: 15px 0;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  word-wrap: break-word;  /* 强制换行 */
  overflow-wrap: break-word; /* 强制换行 */
}


.post:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 放大后的帖子样式 */
.post-fullscreen {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 35%;
  right: 15%;
  width: 60%;
  height: auto;
  z-index: 10;
  background-color: hsl(50, 91%, 48%);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transform: scale(1);
  display: flex;
  flex-direction: column;
  animation: postZoomIn 0.3s ease-in-out;
  word-wrap: break-word;  /* 强制换行 */
  overflow-wrap: break-word; /* 强制换行 */
}

/* 放大后的标题和内容 */
.post-fullscreen h2 {
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
}

.post-fullscreen p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.post-fullscreen ~ .post {
  display: none;
}

.post-fullscreen {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 35%;
  right: 15%;
  width: 60%;
  max-height: 80%;  /* 限制最大高度 */
  z-index: 10;
  background-color: hsl(50, 91%, 48%);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transform: scale(1);
  display: flex;
  flex-direction: column;
  animation: postZoomIn 0.3s ease-in-out;
  word-wrap: break-word;  /* 强制换行 */
  overflow-wrap: break-word; /* 强制换行 */
  overflow-y: auto; /* 允许垂直滚动 */
  height: auto; /* 自动适应内容高度 */
}

/* 放大后的标题和内容 */
.post-fullscreen h2 {
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
}

.post-fullscreen p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.post-fullscreen ~ .post {
  display: none;
}

/* 放大后的帖子样式 */
.post-fullscreen {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 35%;
  right: 15%;
  width: 60%;
  max-height: 80%;  /* 限制最大高度 */
  z-index: 10;
  background-color: hsl(50, 91%, 48%);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transform: scale(1);
  display: flex;
  flex-direction: column;
  animation: postZoomIn 0.3s ease-in-out;
  word-wrap: break-word;  /* 强制换行 */
  overflow-wrap: break-word; /* 强制换行 */
  overflow-y: auto; /* 允许垂直滚动 */
  height: auto; /* 自动适应内容高度 */
}

/* 放大后的标题和内容 */
.post-fullscreen h2 {
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
}

.post-fullscreen p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

/* 添加按钮容器对齐样式 */
.post-fullscreen .button-container {
  display: flex;
  justify-content: flex-start; /* 水平对齐按钮 */
  gap: 10px; /* 按钮之间的间距 */
  margin-top: 20px;
}

/* 按钮样式 */
.el-button {
  margin: 1%; /* 确保按钮之间没有额外的外边距 */
}

.post-fullscreen ~ .post {
  display: none;
}


</style>
