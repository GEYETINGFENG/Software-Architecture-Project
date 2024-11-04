<template>
    <div>
      <h2>结果</h2>
      <p>你的得分：{{ score }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      score: {
        type: Number,
        default: 0
      }
    }
  };
  </script>
  