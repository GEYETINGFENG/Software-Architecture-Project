<template>
<div id="vditor"></div>
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
</style>