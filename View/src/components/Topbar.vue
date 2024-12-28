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
          { text: 'home', link: '/mainPage' },
          { text: 'QS', link: '/qsRanking' },
          { text: 'Blog', link: '/blog' },
          { text: 'Profile', link: '/profile' }

        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .nav {
    background: linear-gradient(to right, #ff7e5f, #feb47b); /* 渐变背景，温暖的橙色调 */
    height: 50px; /* 固定高度 */
    width: 100%;
    /*position: relative;*/
    z-index: 1;
    float: left;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影让导航栏更立体 */
    top: 0px;
    left: 0px;
    right: 0px;
    align-items: center;
    display: flex;
  justify-content: space-evenly;
  }

  
  ul {
    list-style-type: none;
    padding: 10;
    text-align: center;
    display: flex; /* 使用 flexbox 布局 */
    justify-content: space-evenly; /* 自动分配间距，使各导航项均匀分布 */
    align-items: center; /* 垂直居中 */
    width: 100%; /* 宽度 100% 来填充屏幕 */
    top: 5%;
    margin: 0;
    display: flex;
  }
  
  li {
    margin: 2%; /* 设置导航项之间的间距 */
    top: 0;
  }
  
  a {
    position: relative;
    color: #fff; /* 白色字体 */
    text-decoration: none;
    display: inline-block;
    font-size: 1.2em;
    font-weight: bold;
    transition: color 0.3s ease; /* 文字颜色过渡 */
    padding: 10px 20px; /* 添加内边距 */
    border-radius: 5px; /* 圆角边框 */
  }

  .nav a {
    overflow: hidden;
  }
  
  .nav a > span {
    display: block;
    border-radius: 5px;
    transition: transform 0.3s, background-color 0.3s;
  }
  
  .nav a:before {
    position: absolute;
    top: -5px;
    right: -8px;
    z-index: 1;
    padding: 10px;
    width: 100%;
    height: 100%;
    color: #f1db14;
    content: attr(data-hover);
    transition: all 0.2s, opacity 0.2s; /* 添加opacity的过渡效果 */
    font-size: 1.2em;
    opacity: 0; /* 非悬停状态下隐藏 */
    transform: translateY(-100%);
  }

  .nav a:hover::before {
    transform: translateY(0%);
  }
  
  .nav a:hover span {
    transform: rotateY(-90deg);
    background-color: #ff4500; /* 悬停时背景颜色加深 */
  }



.nav a:hover:before {
  transform: translateY(0%);
  opacity: 1; /* 悬停状态下显示 */
}

a:hover {
  background-color: #ff4500; /* 悬停时背景颜色 */
  color: #fff; /* 悬停时文字保持白色 */
}

  </style>