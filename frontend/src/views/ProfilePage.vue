<template>
  <div class="container">
    <video autoplay muted loop class="video-background">
      <source src="../assets/img/204006-923133925_tiny.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <Topbar class="Topbar"/>
    <div id="profile">
      <div class="left-container">
        <div class="avatar">
          头像
        </div>
        <div class="profile-info info-list-row">
          <p>用户名：{{ user.username }}</p>
          <p>邮箱：{{ user.email }}</p>
          <p>简介：{{ user.personal_intro }}</p>
        </div>
      </div>
      <div class="right-container info-list-row">
        <p>发布博客量：{{ user.blogs.length }}</p>
        <p>获赞量：{{ user.totalLikes }}</p>
        <p>对战次数：{{ user.battlesParticipated }}</p>
      </div>
    </div>
      <div class="body-container">
        <!-- 中间选项卡 -->
        <div class="tabs-container">
          <button type="button" @click="setTab('myBlogs')" :class="activeTab==='myBlogs'?'activate-tab':''">我的博客</button>
          <button type="button" @click="setTab('publishBlog')" :class="activeTab==='publishBlog'?'activate-tab':''">发布博客</button>
          <button type="button" @click="setTab('likeRecords')" :class="activeTab==='likeRecords'?'activate-tab':''">点赞记录</button>
          <button type="button" @click="setTab('favorites')" :class="activeTab==='favorites'?'activate-tab':''">收藏记录</button>
        </div>
        <!-- 内容展示 -->
        <div class="content">
          <component :is="selectComponents"/>
        </div>
      </div>
    </div>


</template>

<script>
import axios from 'axios';
import Topbar from "@/components/Topbar.vue";
import PublishBlog from "@/components/ProfilePage/PublishBlog.vue";
import MyBlogs from "@/components/ProfilePage/MyBlogs.vue";
import LikeRecords from "@/components/ProfilePage/LikeRecords.vue";
import Favorites from "@/components/ProfilePage/Favorites.vue";

export default {
  components: {Topbar,PublishBlog,MyBlogs,LikeRecords,Favorites},
  data() {
    return {
      activeTab: "myBlogs", // 默认显示我的博客
      selectComponents: MyBlogs,
      user: { // 初始化一个空的 user 对象
        username: '',
        personal_intro: '',
        blogs: [],
        totalLikes: 0,
        battlesParticipated: 0,
        favoriteTitles: [],
        likedTitles: []
      }
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    setTab(tabName) {
      this.activeTab = tabName;
      if (this.activeTab==='myBlogs'){
        this.selectComponents = MyBlogs
      }else if(this.activeTab==='publishBlog') {
        this.selectComponents = PublishBlog
      }else if(this.activeTab==='likeRecords') {
        this.selectComponents = LikeRecords
      }else if (this.activeTab==='favorites') {
        this.selectComponents = Favorites
      }
    },
    async fetchUserData() {
      try {
        const token = localStorage.getItem('jwt-token'); // 从本地存储获取 JWT
        if (!token) {
          console.error('No JWT token found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:3000/api/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.user=response.data.user
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
      }
  },
};
</script>

<style scoped>
.body-block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 1200px;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 20px;
}

.nav{
  height: auto;
}

/* 通用样式 */
#profile {
  font-family: Arial, sans-serif;
  text-align: center;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "a b"
    "c c";
  grid-gap: 20px;
  padding-top: 5%;

  height: 100%;
  width: 80%;

}

/* 头部信息容器样式 */
.profile-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 20px;
}

.info-list-row{
  text-align: left;
  display: flex;
  flex-direction: column;
}

.left-container{
  grid-area: a;
  background-color: rgba(245, 139, 40, 0.8);
  border: 2px solid #e07821;
  border-radius: 10px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.right-container {
  grid-area: b;
  background-color: rgba(245, 139, 40, 0.8);
  border: 2px solid #e07821;
  border-radius: 10px;
  padding: 20px;
  color: white;
  text-align: left;
}

.body-container{
  grid-area: c;
  width: 80%;
}

.avatar {
  width: 60px;
  height: 60px;
  background-color: #ccc;
  border-radius: 50%;
  text-align: center;
  line-height: 60px;
  margin-bottom: 10px;
}

.profile-info {
  text-align: left;
}

/* 选项卡容器样式 */
.body-container{
  background-color: rgba(245, 139, 40, 0.8);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.tabs-container {
  width: 100%;
  height: 50px;
  background-color: rgba(245, 139, 40, 0.8);
  padding: 0 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4,1fr);
}

.tabs-container button {
  padding: 10px 20px;
  background-color: #f58b28;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


.tabs-container button:hover {
  background-color: rgba(206, 110, 31, 0.75);
}

.activate-tab{
  background-color: #e07821 !important;
}


/* 内容容器样式 */
.content {
  height: 100%;
  background-color: rgba(245, 139, 40, 0.8);
  color: white;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
}

.video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  opacity: 0.7; /* 设置透明度为50% */
  z-index: -100;
  background-size: cover;
  overflow: hidden;
}

.Topbar {
  position: fixed;
  height: 50px;
}
</style>