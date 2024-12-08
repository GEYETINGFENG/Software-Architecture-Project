<template>
  <div class="like-records-container">
    <div class="like-record">

      <div v-for="(title, index) in user.likedTitles" :key="index" class="like-item">
        <span class="like-icon">❤️</span>
        <p>{{ user.username }} likes “{{ title }}”</p>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "LikeRecords",
  data() {
    return {
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
  methods:{
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
        console.log(this.user.likedTitles)
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
      }
  }
}

</script>

<style scoped>
.like-records-container {
  background-color: #f58b28; /* 背景颜色 */
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab-button {
  background-color: #3366cc; /* 按钮背景颜色 */
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.tab-button.active {
  background-color: #4d9de0; /* 激活状态的按钮背景颜色 */
}

.like-record {
  display: flex;
  flex-direction: column;
}

.like-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #85a6f3; /* 点赞记录项背景颜色 */
  padding: 10px;
  border-radius: 5px;
}

.like-icon {
  font-size: 24px;
  margin-right: 10px;
}
</style>