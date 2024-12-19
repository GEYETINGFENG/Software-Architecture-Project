<template>
  <el-scrollbar class="scrollbar">
    <div
      v-for="post in posts"
      :key="post._id"
      class="post"
      :class="{ 'post-fullscreen': currentPostId === post._id }"
      @click="viewPost(post._id)"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <h6>total {{ post.likes }} likes  || total {{ post.favorites }} favorites</h6>
      <el-button type="success" round @click.stop="likePost(post.title)" class="funbutton">Like</el-button>
      <el-button type="warning" round @click.stop="collectPost(post.title)" class="funbutton">Favorite</el-button>
      <!-- 评论区域 -->
      <transition name="fade">
        <div v-if="currentPostId === post._id" class="comment-section">
          <div class="comment-input">
            <el-input
              type="textarea"
              v-model="newComment" 
              placeholder="Write your comment..."
              class="inputbox"
            />
            <el-button type="primary" round @click="submitComment(post.title)" class="submit-button">Post Comment</el-button>
          </div>
          <!-- 显示评论 -->
          <div v-for="(comment, index) in post.comments" :key="index" class="comment">
            <p>{{ comment}}</p>
          </div>
          <!-- 退出按钮 -->
          <el-button type="danger" round @click.stop="viewPost(null)">EXIT</el-button>
        </div>
      </transition>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref ,onMounted} from 'vue';
import axios from 'axios';
const newComment = ref(''); // 保存当前输入的评论内容
const posts = ref([]);
//用于查看当前帖子的ID
const currentPostId = ref(null);
const token = localStorage.getItem('jwt-token'); 
// 获取所有帖子数据
const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/articles',{ headers: { Authorization: `Bearer ${token}` } });
    console.log("返回的数据是",response)
    posts.value = response.data.articles;  // 假设返回数据结构中有 articles 数组
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
};

// 发布评论函数
const submitComment = async (articleTitle) => {
  try {
    // 检查输入的评论内容是否为空
    if (!newComment.value.trim()) {
      console.error('Comment cannot be empty');
      return;
    }
    // 调用后端接口发布评论
    const response = await axios.post(
      `http://localhost:3000/api/article/${articleTitle}/comment`,
      { comment: newComment.value }, // 请求体
      {headers: { Authorization: `Bearer ${token}` },}
    );

    console.log('评论发布成功:', response.data);

    // 刷新当前文章的评论
    const updatedArticle = response.data.article;
    const post = posts.value.find((p) => p.title === articleTitle);
    if (post) {
      post.comments = updatedArticle.comments; // 更新文章的评论列表
    }

    // 清空评论输入框
    newComment.value = '';
  } catch (error) {
    console.error('Failed to publish comment:', error);
  }
};

// 页面加载时获取数据
onMounted(fetchPosts);


// 点赞文章
const likePost = async (articleTitle) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/article/${articleTitle}/like`,
      {}, // 空请求体
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('点赞成功:', response.data);

    // 更新点赞数
    const post = posts.value.find((p) => p.title === articleTitle);
    if (post) {
      post.likes = response.data.likes; // 更新点赞数
    }
  } catch (error) {
    console.error('Failed to like post:', error);
  }
};

// 收藏文章
const collectPost = async (articleTitle) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/article/${articleTitle}/favorite`,
      {}, // 空请求体
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('收藏成功:', response.data);

    // 更新收藏数
    const post = posts.value.find((p) => p.title === articleTitle);
    if (post) {
      post.favorites = response.data.favorites; // 更新收藏数
    }
  } catch (error) {
    console.error('Failed to favorite post:', error);
  }
};


function viewPost(id) {
  if (id !== null) {
    currentPostId.value = id;
  } else {
    currentPostId.value = null; // 退出时重置当前帖子 ID
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
