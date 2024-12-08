<template>
  <div class="container" :class="{ 'sign-up-mode': isSignUpMode }">
    <div class="forms-container">
      <div class="signin-signup">
        
        <!-- Sign In Form -->
        <form @submit.prevent="handleSignIn" class="sign-in-form">
          <h2 class="title">Sign in</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" v-model="username" placeholder="Username" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="password" placeholder="Password" required />
          </div>
          <input type="submit" value="Login" class="btn solid"  />
        </form>
        
        <!-- Sign Up Form -->
        <form @submit.prevent="handleSignUp" class="sign-up-form">
          <h2 class="title">Sign up</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" v-model="username" placeholder="Username" 
            required minlength="3" maxlength="20" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="email" placeholder="Email" required  />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="password" placeholder="Password" 
            required minlength="8" />
          </div>
            <!-- Confirm Password Input -->
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="confirmPassword" placeholder="Confirm Password" 
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
import CryptoJS from 'crypto-js';
export default {
  data() {
  return {
    username: '',
    password: '',
    confirmPassword: '',  // 添加 confirmPassword 变量
    email: '',
    error: null,
    encryptionKey: 'A1B2C3D4E5F6G7H8',
    isSignUpMode: false,
    passwordErrors: [],
    confirmPasswordErrors: [],
  };
},
  methods: {
    encryptPassword(password) {
      const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(this.encryptionKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    },
    validatePassword() {
        this.passwordErrors = [];
  
        // 检查密码长度
        if (this.password.length < 8) {
          this.passwordErrors.push('Password must be at least 8 characters long.');
        }
  
        // 检查是否包含至少一个数字
        if (!/\d/.test(this.password)) {
          this.passwordErrors.push('Password must contain at least one number.');
        }
  
        // 检查是否包含至少一个特殊字符
        if (!/[!@#$%^&*]/.test(this.password)) {
          this.passwordErrors.push('Password must contain at least one special character.');
        }
      },
    validateConfirmPassword() {
      this.confirmPasswordErrors = [];
        
      if (this.password !== this.confirmPassword) {
        this.confirmPasswordErrors.push('Passwords do not match.');
      }
    },
    toggleSignUpMode() {
      this.isSignUpMode = !this.isSignUpMode;
    },
    // 处理登录
    async handleSignIn() {
      if (!this.username || !this.password) {
        this.error = 'Please enter both Username and Password.';
        return;
      }
      console.log('Submitting form with username:', this.username);
      console.log('Submitting form with password:', this.password);

      try {
        const encryptedPassword = this.encryptPassword(this.password);
        console.log('Encrypted password:', encryptedPassword);

        const response = await axios.post('http://localhost:3000/api/users/login', {
          username: this.username,
          password: encryptedPassword,
        });

        if (response.data.status === 0) {
          const token = response.data.token;
          localStorage.setItem('jwt-token', token);
          this.$router.push('/mainPage');//本来想推送到主页，但是主页没做出来
        } else {
          this.error = response.data.msg || 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        this.error = 'Login failed. Please check your credentials.';
        console.error(error);
      }
    },
    // 处理注册
    async handleSignUp() {
      this.validatePassword();
      this.validateConfirmPassword();
      if (this.passwordErrors.length === 0 && this.confirmPasswordErrors.length === 0) {
        const encryptedPassword = this.encryptPassword(this.password);
        try {
          const response = await axios.post('http://localhost:3000/api/users/register', {
            username: this.username,
            email: this.email,
            password: encryptedPassword,
          });
          console.log(response.data)
          if (response.data.status === 0) {
            console.log('Registration successful!');
          } else {
            console.error('Registration failed:', response.data.msg);
          }
        } catch (error) {
          console.error('Error during registration:', error);
        }
      } else {
        console.error('Password validation failed.', error);
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/LoginStyle.css"; 
</style>
