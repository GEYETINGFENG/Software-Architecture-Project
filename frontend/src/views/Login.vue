<template>
  <div class="container" :class="{ 'sign-up-mode': isSignUpMode }">
    <div class="forms-container">
      <div class="signin-signup">
        
        <!-- Sign In Form -->
        <form @submit.prevent="handleSignIn" class="sign-in-form">
          <h2 class="title">Sign in</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" v-model="signInUsername" placeholder="Username" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="signInPassword" placeholder="Password" required />
          </div>
          <input type="submit" value="Login" class="btn solid"  />
        </form>
        
        <!-- Sign Up Form -->
        <form @submit.prevent="handleSignUp" class="sign-up-form">
          <h2 class="title">Sign up</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" v-model="signUpUsername" placeholder="Username" 
            required minlength="3" maxlength="20" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="signUpEmail" placeholder="Email" required  />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="signUpPassword" placeholder="Password" 
            required minlength="8" />
          </div>
          <input type="submit" class="btn" value="Sign up" />
        </form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            Enter your details and start your journey with us
          </p>
          <button class="btn transparent" @click="toggleSignUpMode">
            Sign up
          </button>
        </div>
        <img src="../assets/img/login.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            To keep connected with us please login with your personal info
          </p>
          <button class="btn transparent" @click="toggleSignUpMode">
            Sign in
          </button>
        </div>
        <img src="../assets/img/register.svg" class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 
export default {
  data() {
    return {
      isSignUpMode: false,
      signInUsername: '',
      signInPassword: '',
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
    };
  },
  methods: {
    toggleSignUpMode() {
      this.isSignUpMode = !this.isSignUpMode;
    },
    // 处理登录
    async handleSignIn() {
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          username: this.signInUsername,
          password: this.signInPassword,
        });
        console.log('Login successful:', response.data);
        alert('Login successful');
      } catch (error) {
        console.error('Error during sign in:', error);
        alert('Failed to login');
      }
    },
    // 处理注册
    async handleSignUp() {
      try {
        const response = await axios.post('http://localhost:3000/api/users/register', {
          username: this.signUpUsername,
          email: this.signUpEmail,
          password: this.signUpPassword,
        });
        console.log('Registration successful:', response.data);
        alert('Registration successful');
      } catch (error) {
        console.error('Error during sign up:', error);
        alert('Failed to register');
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/LoginStyle.css"; 
</style>
