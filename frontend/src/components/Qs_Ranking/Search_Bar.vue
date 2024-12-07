<template>
  <div class="search-college">
    <input type="text" v-model="collegeName" placeholder="Enter college name" @keyup.enter="emitQueryQS" class="input-field">
    <button @click="emitQueryQS" class="search-button">🔍︎</button>
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  box-sizing: border-box;
  margin: 5% auto;
}


.input-field {
  outline-style: none;
  width: 75%;
  height: 30px; /* Increased height */
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
  height: 59px;
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