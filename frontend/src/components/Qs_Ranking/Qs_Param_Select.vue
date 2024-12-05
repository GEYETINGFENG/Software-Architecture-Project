<template>
  <div class="param-select">
    <div class="button-container" ref="topAnchor">
      <div class="button-group">
        <label>Year:</label>
        <button
            v-for="year in years"
            :key="year"
            :class="{'active': yearPicked === year}"
            @click="yearPicked = year"
        >{{ year }}
        </button>
      </div>
      <div class="button-group">
        <label>Region:</label>
        <button
            v-for="location in locations"
            :key="location"
            :class="{'active': locationPicked === location}"
            @click="locationPicked = location"
        >{{ location }}
        </button>
      </div>
      <div class="button-group">
        <button @click="$emit('queryQS')" class="animated-button">Apply Filter</button>
        <button @click="resetFilter" class="animated-button">Clear Filter</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Qs_Param_Select",
  data() {
    return {
      yearPicked: "2025",
      locationPicked: "All",
      years: ["2025", "2024"],
      locations: ["All", "United Kingdom", "United States", "Canada", "Australia", "China", "Singapore"],
    };
  },
  watch: {
    yearPicked(newVal) {
      this.$emit("yearPicked", newVal);
    },
    locationPicked(newVal) {
      this.$emit("locationPicked", newVal);
    },
  },
  methods: {
    resetFilter() {
      this.yearPicked = "2025";
      this.locationPicked = "All";
    },
  },
}
</script>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.button-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.button-group label {
  margin-right: 10px;
  font-weight: bold;
}

.button-group button {
  margin: 0 5px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.button-group button.active {
  background-color: #007BFF;
  color: white;
  border-color: #007BFF;
}

.animated-button {
  transition: transform 0.2s ease;
}

.animated-button:active {
  transform: scale(0.95);
}
</style>