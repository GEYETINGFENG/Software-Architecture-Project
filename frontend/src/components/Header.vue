<template>
    <header>
      <nav>
        <ul>
          <li><router-link to="/">主页</router-link></li>
          <li><router-link to="/blogs">博客</router-link></li>
          <li><router-link to="/battle">在线对战</router-link></li>
          <li><router-link to="/universities">院校查询</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  nav ul {
    display: flex;
    gap: 15px;
    list-style: none;
  }
  </style>
  