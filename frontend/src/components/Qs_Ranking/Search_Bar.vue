<template>
  <div class="search-college">
    <div class="input-container">
      <input type="text" v-model="collegeName" placeholder="Enter college name" class="input-field">
      <button @click="emitQueryQS" class="search-button">🔍︎</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchCollege",
  data() {
    return {
      collegeName: "",
    };
  },
  watch: {
    collegeName(newVal) {
      this.$emit("collegeName", newVal);
    },
  },
  methods: {
    emitQueryQS() {
      this.$emit("queryQS");
    },
  },
}
</script>

<style scoped>

.search-college {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15vh;
  box-sizing: border-box;
}

.input-container {
  display: flex;
  width: 60%;
  margin: 0 auto 10px auto;
  justify-content: center;
}

.input-field {
  outline-style: none ;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 13px 14px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Times New Roman", Times, serif;
}

.input-field:focus{
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}

.search-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>