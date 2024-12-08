<template>
    <Topbar class="Navbar"/>
    <div class="main-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Welcome to MindWarriors</h1>
      <p>Start your intellectual competitive journey</p>
      <button @click="startJourney" class="cta-button">Start Battle</button>
    </section>

    <!-- Feature Panels -->
    <section class="features">
      <div class="feature">
        <h2>Quiz Battles</h2>
        <p>Engage in real-time quiz challenges and test your knowledge!</p>
      </div>
      <div class="feature">
        <h2>Personal Blogs</h2>
        <p>Share your learning experiences and inspire the community.</p>
      </div>
      <div class="feature">
        <h2>University Rankings</h2>
        <p>Explore top universities and plan your academic future.</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2024 MindWarriors. All rights reserved.</p>
    </footer>
    </div>
  </template>
  
  <script>
  import Topbar from '../components/Topbar.vue';
  import Quiz from './Quiz.vue';
  export default {
    name: 'MainPage',
    components: {
      Topbar
    },
    methods: {
    startJourney() {
      this.$router.push({ path: '/quiz' });
    }
    }
    };
  </script>
  
  <style scoped>
    @import "../assets/css/mainPageStyle.css"; 
  </style>
  