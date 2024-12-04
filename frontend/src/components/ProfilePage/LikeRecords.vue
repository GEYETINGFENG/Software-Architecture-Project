<template>
  <div class="like-records-container">
    <div class="like-record">
      <div class="like-item">
        <span class="like-icon">❤️</span>
        <p>Aberdeen Student likes “Mastering Study Skills: Tips for Efficient Learning”</p>
      </div>
      <div class="like-item">
        <span class="like-icon">❤️</span>
        <p>Aberdeen Student likes “Becoming a Lifelong Learner: Embracing Self-Directed Study”</p>
      </div>
      <div class="like-item">
        <span class="like-icon">❤️</span>
        <p>Aberdeen Student likes “Starting from Scratch: My Software Engineering Learning Journey”</p>
      </div>
      <div class="like-item">
         <span class="like-icon">❤️</span>
         <p>Aberdeen Student likes “The Art of Problem Solving: A Guide for Software Engineers”</p>
      </div>

      <div class="like-item">
        <span class="like-icon">❤️</span>
        <p>Aberdeen Student likes “Innovative Thinking: Strategies for Creative Solutions”</p>
      </div>

      <div class="like-item">
        <span class="like-icon">❤️</span>
        <p>Aberdeen Student likes “Data Structures and Algorithms: A Deep Dive”</p>
      </div>

      <div class="like-item">
        <span class="like-icon">❤️</span>
        <p>Aberdeen Student likes “User Experience Design: Principles and Practices”</p>
      </div>

      <div class="like-item">
        <span class="like-icon">❤️</span>
        <p>Aberdeen Student likes “Cybersecurity Fundamentals: Protecting Digital Assets”</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LikeRecords"
}
</script>

<style scoped>
.like-records-container {
  background-color: #f58b28; /* 背景颜色 */
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab-button {
  background-color: #3366cc; /* 按钮背景颜色 */
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.tab-button.active {
  background-color: #4d9de0; /* 激活状态的按钮背景颜色 */
}

.like-record {
  display: flex;
  flex-direction: column;
}

.like-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #85a6f3; /* 点赞记录项背景颜色 */
  padding: 10px;
  border-radius: 5px;
}

.like-icon {
  font-size: 24px;
  margin-right: 10px;
}
</style>