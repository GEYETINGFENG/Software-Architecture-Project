
<template>
    <div id="blog">
      <el-container>
        <el-header>
            <Navbar class="Navbar" />
        </el-header>
        <el-container>
          <el-aside width="30%" > 
            <ContentInput class="ContentInput"/>
          </el-aside>
          <el-container>
            <el-main>
                <PostList />
            </el-main>
          </el-container>
        </el-container>
            <el-footer class="footer">
                <Footer />
            </el-footer>
      </el-container>
    </div>
  </template>
  
  <script setup>
  import { ref, provide } from 'vue'
  import Navbar from '../components/Topbar.vue';
  import PostList from '../components/PostList.vue';
  import ContentInput from '../components/ContentInput.vue';
  import Footer from '../components/Footer.vue';

  // 所有的帖子数据
const allPosts = ref([
  { id: 1, title: 'Post 1', context: 'Content 1', likes: 0 },
  { id: 2, title: 'Post 2', context: 'Content 2', likes: 10 },
  { id: 3, title: 'Post 3', context: 'Content 3', likes: 5 },
])

// 收藏的帖子
const collectedPosts = ref([allPosts.value[1]])

const posts = ref(allPosts.value)

// 提供给子组件
provide('posts', posts)
provide('allPosts', allPosts)
provide('collectedPosts', collectedPosts)

// 提供方法来切换帖子显示
const showCollectedPosts = () => {
  posts.value = collectedPosts.value
}

const showAllPosts = () => {
  posts.value = allPosts.value
}

provide('showCollectedPosts', showCollectedPosts)
provide('showAllPosts', showAllPosts)
  </script>
  




  <style scoped>

  #blog {
    display: flex;
    flex-direction: column;
    background-image: url('../assets/img/blogback.jpg'); 
    height: 100%; /* 确保body填满整个视口高度 */
    margin: 0; /* 移除默认的边距 */
    background-size: cover; /* 确保图片覆盖整个背景 */
    background-position: center; /* 图片居中显示 */
    min-width: 100%; /* 确保背景至少覆盖整个视口高度 */
  }

  .Navbar{
    position: fixed
  }

  .footer{
    position: fixed;
    display: flex;
    width: 100%;
  }
  </style>