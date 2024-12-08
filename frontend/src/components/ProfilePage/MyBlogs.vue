<template xmlns="http://www.w3.org/1999/html">
  <div class="my-blog">
    <div class="blog-carousel">
      <button @click="prevBlog" class="carousel-control prev">‹</button>
      <div class="blog-list" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(blog, index) in blogs" :key="index" class="blog-item">
          <div class="blog-content" @click="openBlogDetail(index)">
            <h3>{{ blog.title }}</h3>
            <p>{{ blog.content }}</p>
            <div class="operate-view" v-if="detailOpen">
              <button type="button" @click.stop="clickLike" class="like_img"  >
                <img src="../../assets/img/like.svg" alt="3213213">
                {{blogs[index].likes}}
              </button>
              <button type="button" @click.stop="clickComment"><Comment/>{{blogs[index].comments.length}}</button>
              <button type="button" @click.stop="clickStar"><Star/>{{blogs[index].favorites}}</button>
              <button type="button" @click.stop="clickDelete"><Delete/></button>
            </div>

          </div>
        </div>
      </div>
      <button @click="nextBlog" class="carousel-control next">›</button>
    </div>
    <div v-if="commentOpen" class="comment-list">
      <ul>
        <li v-for="(comment, index) in blogs[currentIndex].comments" :key="index">
          <p>{{ comment }}</p>
          <div class="comment-operate-view">
            <!-- 点击删除时传递 comment 内容 -->
            <button type="button" @click="deleteComment(comment)">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ChatLineSquare, Comment, Delete, Star} from "@element-plus/icons-vue";
import axios from 'axios';
export default {
  name: "MyBlog",
  components: {Comment, Delete, Star, ChatLineSquare},
  data() {
    return {
      blogs: [],
      currentIndex: 0,
      intervalId: null,
      detailOpen: false,  // 是否打开了某个博客的详情页
      commentOpen: false, // 是否打开了评论框
      iconNum:0,
      commentNum:0,
      starNum:0,
    };
  },
  methods: {
    async fetchUserArticles() {
      try {
        // 获取存储在 localStorage 中的 JWT token
        const token = localStorage.getItem('jwt-token');
        if (!token) {
          console.error('No token found');
          return;
        }
        // 调用后端 API 获取该用户的所有文章
        const response = await axios.get('http://localhost:3000/api/user/articles', {
          headers: {
            Authorization: `Bearer ${token}` // 将 token 添加到请求头中
          }
        });
        // 如果请求成功，将文章数据更新到 blogs
        if (response.status === 200) {
          this.blogs = response.data.articles;
          // console.log("文章的内容是"+this.blogs)
          // console.log("文章的点赞数是"+this.blogs.likes)
          // console.log("文章的收藏数是"+this.blogs.favorites)
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    // 删除评论
    async deleteComment(commentContent) {
      const articleTitle = this.blogs[this.currentIndex].title;
      try {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
          console.error('No token found');
          return;
        }

        // 发送 DELETE 请求
        const response = await axios.delete(
          `http://localhost:3000/api/article/${articleTitle}/comment`,
          {
            data: { commentContent: commentContent }, 
            headers: { Authorization: `Bearer ${token}` }  
          }
        );
        // 删除成功后，更新本地的评论数据
        if (response.status === 200) {
          const index = this.blogs[this.currentIndex].comments.indexOf(commentContent);
          if (index !== -1) {
            this.blogs[this.currentIndex].comments.splice(index, 1);
          }
          console.log('Comment deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },
    nextBlog() {
      const totalBlogs = this.blogs.length;
      this.currentIndex = (this.currentIndex + 1) % totalBlogs;
    },
    prevBlog() {
      const totalBlogs = this.blogs.length;
      this.currentIndex = (this.currentIndex - 1 + totalBlogs) % totalBlogs;
    },
    startAutoPlay() {
      this.intervalId = setInterval(() => {
        this.nextBlog();
      }, 4000); // 每5秒切换一次
    },
    stopAutoPlay() {
      clearInterval(this.intervalId);
    },
    openBlogDetail(blog) {
      // 如果评论详情被打开，则不允许跳转到博客详情页
      if (this.commentOpen) {
        this.commentOpen = false;
        return
      }
      // 跳转到博客详情页
      if(!this.detailOpen) {
        this.detailOpen = true;
        this.stopAutoPlay();
        if (this.currentIndex !== blog) {
          this.currentIndex = blog;
        }
      }else{
        this.detailOpen = false;
        // 跳转到博客列表页
        this.startAutoPlay();
      }
    },
    clickComment(){
      if(!this.commentOpen){
        this.commentOpen = true;
      }else{
        this.commentOpen = false;
      }
    },
    clickLike(){},
    clickStar(){},
    async clickDelete() {
  const articleTitle = this.blogs[this.currentIndex].title; // 获取当前选中博客的标题
  console.log('当前要删除的文章标题是: ' + articleTitle);

  try {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
      console.error('No token found');
      return;
    }

    // 发送 DELETE 请求到后端删除文章
    const response = await axios.delete(
      `http://localhost:3000/api/article/${articleTitle}`, 
      {
        headers: { Authorization: `Bearer ${token}` }  // 将 token 添加到请求头
      }
    );

    // 如果删除成功，移除本地的文章数据
    if (response.status === 200) {
      const index = this.blogs.findIndex(blog => blog.title === articleTitle);
      if (index !== -1) {
        this.blogs.splice(index, 1);  // 删除本地数据中的文章
      }
      console.log('Article deleted successfully');
      alert('Article deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    alert('Error deleting article');
  }
}
  },
  mounted() {
    this.fetchUserArticles();
    this.startAutoPlay();
  },
  beforeDestroy() {
    this.stopAutoPlay();
  },
};
</script>

<style scoped>

.my-blog {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.blog-carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 400px;
}

.blog-list {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
  min-height: 400px;
}

.blog-item {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.blog-content {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  color: black;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%; /* 调整博客内容的宽度 */
  max-width: 600px; /* 最大宽度 */
  height: 80%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
}



.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 10;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

/*操作列图标的样式*/
.operate-view{
  position: absolute;
  left: 65%;
  top: 90%;
  display: flex;
  align-items: center;
}

.operate-view button {
  background-color: transparent;
  border: none;
  color: #666;
  font-size: 20px;
  margin: 0 0;
  height: 24px;
  width: 48px;

  display: flex;

}

.operate-view button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.operate-view button svg{
  width: 100%;
  height: 100%;
}

.comment-scrollbar{
  width: 100%;
  display: flex;
  justify-content: center;
}

.comment-list{
  width: 100%;
  display: flex;
  justify-content: center;
}

.comment-list ul{
  list-style: none;
  padding: 0;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 10px;
}

.comment-list ul li{
  width: 95%;
  display: grid;
  grid-template-columns: 80% 1fr;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.20);
  border-radius: 10px;
}

.comment-list ul li:last-child{
  margin-bottom: 10px;
}

.comment-list ul li p{
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 80%;
  padding-left: 10px;
  text-align: left;
}

.comment-operate-view{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.comment-operate-view button{
  background-color: transparent;
  border: none;
  color: #666;
  font-size: 20px;
  width: 96px;
  height: 24px;
  margin: 5px 0;
  align-self: end;
  justify-self: start;

  display: flex;
  align-items: center;
}

.comment-operate-view button svg{
  width: 24px;
  height: 24px;
}

.comment-operate-view button:hover{
  background-color: rgba(0, 0, 0, 0.1);
}


</style>