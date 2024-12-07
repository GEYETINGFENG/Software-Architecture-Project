<template>
    <section class="nav">
      <ul>
        <li v-for="item in navItems" :key="item.text">
          <router-link :to="item.link" :data-hover="item.text">
            <span>{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 导航项数据
        navItems: [
          { text: 'Competition', link: '/Quiz' },
          { text: 'QS', link: '/qsRanking' },
          { text: 'Blog', link: '/Login' },
          { text: 'Profile', link: '/profile' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .nav {
    background: linear-gradient(to right, #ff7e5f, #feb47b); /* 渐变背景，温暖的橙色调 */
    height: 10%; /* 减小导航栏的高度 */
    width: 100%;
    position: relative;
    z-index: 1;
    box-shadow: none; /* 取消导航栏的边框阴影 */
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    text-align: center;
    display: flex; /* 使用 flexbox 布局 */
    justify-content: space-evenly; /* 自动分配间距，使各导航项均匀分布 */
    align-items: center; /* 垂直居中 */
    width: 100%; /* 宽度 100% 来填充屏幕 */
    margin: 0 0 0 0;
  }
  
  li {
    margin: 0 35px; /* 设置导航项之间的间距 */
  }
  
  a {
    position: relative;
    color: #fff; /* 白色字体 */
    text-decoration: none;
    display: inline-block;
    font-size: 1.3em;
    font-weight: bold;
    transition: color 0.3s ease; /* 文字颜色过渡 */
  }
  .nav a {
    overflow: hidden;
  }
  
  .nav a > span {
    display: block;
    padding: 12px 30px;
    background: #ff6347; /* 温暖的红色背景 */
    border-radius: 5px;
    transition: transform 0.3s, background-color 0.3s;
  }
  
  .nav a:before {
    position: absolute;
    top: 0;
    left: -12px;
    z-index: -1;
    padding: 10px;
    width: 100%;
    height: 100%;
    color: #ff6347;
    content: attr(data-hover);
    background: white;
    transform: translateY(-100%);
    transition: all 0.2s;
  }
  
  .nav a:hover::before {
    transform: translateY(0%);
  }
  
  .nav a:hover span {
    transform: rotateY(-90deg);
    background-color: #ff4500; /* 悬停时背景颜色加深 */
  }
  
  .nav a:hover {
    color: #fff; /* 悬停时文字保持白色 */
  }
  </style>
  