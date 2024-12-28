
export default {
  name: "CollectionRecord"
}

<template>
  <div class="collection-record">
    <div class="record-content">
      <div v-for="item in user.favoriteTitles" :key="item.id" class="collection-item">
        <div class="collection-item-content">
          <p>{{ item }}</p>
          <span class="star" :class="{ active: true }">
            <Star v-if="item.isStarred"/>
            <StarFilled v-else/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Star, StarFilled} from "@element-plus/icons-vue";
import axios from 'axios';

export default {
  components: {StarFilled, Star},
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
      },
      collectionList: [
        { id: 1, title: 'Mastering Study Skills: Tips for Efficient Learning', isStarred: true },
        { id: 2, title: 'Language Learning Made Easy: A 5-Step Guide to Get Started', isStarred: false },
        { id: 3, title: 'Beating Procrastination: Boost Your Study Efficiency with the Pomodoro Technique', isStarred: true },
        { id: 4, title: 'Sustaining Study Motivation: How to Keep Your Learning Drive Alive', isStarred: false },
        { id: 5, title: 'Becoming a Lifelong Learner: Embracing Self-Directed Study', isStarred: false},
        { id: 6, title: 'Starting from Scratch: My Software Engineering Learning Journey', isStarred: false},
      ],
      activeTab: 'collection'
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
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
        console.log(this.user.favoriteTitles)
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
      },
    i() {
      return i
    },
    setTab(tabName) {
      this.activeTab = tabName;
    },
    toggleStar(item) {
      item.isStarred = !item.isStarred;
    }
  }
};
</script>

<style scoped>
.collection-record {
  background-color: #f58b28;
  padding: 20px;
  border-radius: 10px;
}

.collection-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(240, 240, 240, 0.5);
  width: 100%;
  height: 70px;
  border-radius: 5px;
}

.collection-item-content {
  display: grid;
  grid-template-columns: 95% 1fr;
  align-items: center;
  color: #666;
  width: 100%;
}

.star {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

</style>

