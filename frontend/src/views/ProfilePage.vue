<template>
  <div id="profile">
    <!-- 头部信息，分为左右两个容器 -->
    <div class="profile-section">
      <!-- 左侧容器：头像和基本信息 -->
      <div class="left-container">
        <div class="avatar">头像</div>
        <div class="profile-info">
          <p>用户名：Aberdeen Student</p>
          <p>简介：我是一个喜欢学习的软件工程师</p>
          <p>安全信息</p>
        </div>
      </div>
      <!-- 右侧容器：统计数据 -->
      <div class="right-container">
        <p>发布博客量：10</p>
        <p>获赞量：100</p>
        <p>对战次数：1</p>
      </div>
    </div>

    <!-- 中间选项卡 -->
    <div class="tabs-container">
      <div class="tabs">
        <button @click="setTab('myBlogs')">我的博客</button>
        <button @click="setTab('publishBlog')">发布博客</button>
        <button @click="setTab('likeRecords')">点赞记录</button>
        <button @click="setTab('favorites')">收藏记录</button>
      </div>
    </div>

    <!-- 内容展示 -->
    <div class="content">
      <div v-if="activeTab === 'myBlogs'">这是我的博客内容</div>
      <div v-if="activeTab === 'publishBlog'">这是发布博客页面</div>
      <div v-if="activeTab === 'likeRecords'">这是点赞记录页面</div>
      <div v-if="activeTab === 'favorites'">这是收藏记录页面</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "myBlogs", // 默认显示我的博客
    };
  },
  methods: {
    setTab(tabName) {
      this.activeTab = tabName;
    },
  },
};
</script>

<style scoped>
/* 通用样式 */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}

/* 头部信息容器样式 */
.profile-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 20px;
}

.left-container{
  width: 45%;
  background-color: rgba(245, 139, 40, 0.8);
  border: 2px solid #e07821;
  border-radius: 10px;
  padding: 20px;
  color: white;
}

.right-container {
  width: 45%;
  background-color: rgba(245, 139, 40, 0.8);
  border: 2px solid #e07821;
  border-radius: 10px;
  padding: 20px;
  color: white;
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
.tabs-container {
  width: 100%;
  background-color: rgba(245, 139, 40, 0.8);
  padding: 10px 0;
  margin-top: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.tabs button {
  padding: 10px 20px;
  background-color: #f58b28;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.tabs button:hover {
  background-color: #e07821;
}

/* 内容容器样式 */
.content {
  background-color: rgba(245, 139, 40, 0.8);
  color: white;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
}
</style>



