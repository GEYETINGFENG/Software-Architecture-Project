<template>
  <div class="container" :class="{ 'sign-up-mode': isSignUpMode }">
    <div class="forms-container">
      <div class="signin-signup">
        <!-- Sign In Form -->
        <form @submit.prevent="handleSignIn" class="sign-in-form">
          <h2 class="title">Sign in</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" v-model="signInUsername" placeholder="Username" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="signInPassword" placeholder="Password" />
          </div>
          <input type="submit" value="Login" class="btn solid" />
        </form>
        
        <!-- Sign Up Form -->
        <form @submit.prevent="handleSignUp" class="sign-up-form">
          <h2 class="title">Sign up</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" v-model="signUpUsername" placeholder="Username" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="signUpEmail" placeholder="Email" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="signUpPassword" placeholder="Password" />
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
    handleSignIn() {
      // Handle sign-in logic here
      console.log('Sign in with', this.signInUsername, this.signInPassword);
    },
    handleSignUp() {
      // Handle sign-up logic here
      console.log('Sign up with', this.signUpUsername, this.signUpEmail, this.signUpPassword);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/LoginStyle.css"; 
</style>
