<template>
    <div>
      <Header />
      <div class="main-content">
        <h1>欢迎来到 MindWarriors!</h1>
        <div class="features">
          <div v-for="feature in features" :key="feature.id" class="feature-item">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  
  export default {
    components: {
      Header,
      Footer
    },
    data() {
      return {
        features: [
          { id: 1, title: '博客管理', description: '创建和管理你的个人博客' },
          { id: 2, title: '在线对战', description: '与他人实时 PK 答题' },
          { id: 3, title: '院校查询', description: '探索 QS 世界大学排名' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .main-content {
    padding: 20px;
  }
  .feature-item {
    margin-bottom: 20px;
  }
  </style>
  