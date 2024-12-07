<template>
  <div class="body-container">
    <div id="vditor"></div>
    <div class="button-view">
      <button type="button">发布</button>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor';
import "vditor/dist/index.css";

export default {
  name: "PostBlog",

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