<template>
    <div>
      <h2>登录</h2>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="用户名" required />
        <input type="password" v-model="password" placeholder="密码" required />
        <button type="submit">登录</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // 调用后端登录接口
        console.log(`登录用户: ${this.username}`);
      }
    }
  };
  </script>
  