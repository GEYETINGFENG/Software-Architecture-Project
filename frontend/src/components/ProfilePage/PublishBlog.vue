<template>
  <div class="body-container">
    <div class="input-container">
      <el-input
        v-model="title_input"
        style="width: 75%;"
        placeholder="输入博客标题"
        clearable
      />
    </div>
    <div id="vditor"></div>
    <div class="button-view">
      <button type="button" @click="publishBlog">发布</button>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor';
import "vditor/dist/index.css";
import axios from 'axios';

export default {
  name: "PostBlog",
  data() {
    return {
      title_input: "",
    };
  },

  methods: {
    async publishBlog() {
      const token = localStorage.getItem('jwt-token'); // 从本地存储获取 JWT
      const content = this.contentEditor.getValue(); // 获取 Vditor 编辑器内容

      // 发送 POST 请求
      try {
        const response = await axios.post(
          'http://localhost:3000/api/blog/publish',
          { title: this.title_input, content },
          { headers: { Authorization: `Bearer ${token}` } } // 使用 Bearer token 认证
        );
        console.log(response.data);
        alert('文章发布成功');
      } catch (error) {
        console.error(error.response.data);
        alert(error.response.data.message || '发布失败');
      }
    },
  },

  mounted() {
    this.contentEditor = new Vditor('vditor',{
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false,
      },
      height: 500,
      width:"100%",
      preview: {
        mode: 'both',
      }
    })
  }

}
</script>

<style scoped>
.input-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%;
}

#vditor{
  text-align: left;
}

.body-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.button-view{
  align-self: flex-end;
}

.button-view button{
  background-color: #d75d16;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
}

.button-view button:active{
  background-color: #bd5214;
}

</style>