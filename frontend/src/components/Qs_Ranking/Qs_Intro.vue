<template>
  <div class="intro-container">
    <img src="../../assets/img/qs_img.jpg" alt="Qs_img">
    <div class="text_container">
      <h2 id="intro_title">{{ intro_title }}</h2>
      <h4 id="date">{{ date }}</h4>
      <h4 id="introduction">{{ introduction }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Qs_Intro",
  data() {
    return {
      introduction: "The 2025 QS World University Rankings assess global universities using nine specific indicators, " +
          "with each indicator assigned a different weight. These nine indicators and their respective weights are:" +
          " Academic Reputation, which accounts for 30%; Employer Reputation, with a weight of 15%; " +
          "Faculty-Student Ratio, contributing 10%; Citations per Faculty, which holds a weight of 20%; " +
          "International Faculty Ratio, at 5%; International Student Ratio, also at 5%; " +
          "International Research Network, accounting for 5%; " +
          "Employment Outcomes, which makes up 5%; and Sustainability, which contributes 5%.",
      date:"Official Latest Ranking: 2025 | Updated on: June 5, 2025\n",
      intro_title: "QS World University Rankings",
    };
  },
}
</script>

<style scoped>
.intro-container {
  display: flex;
  align-items: center;

}

.intro-container img {
  margin-right: 10px;
}

.text_container {
  display: flex;
  flex-direction: column;
}

.text_container > * {
  margin-top: 10px;
  margin-bottom: 12px;
}

#intro_title {
  color: #2f478f;

}

#date {
  color: #777a76;
}

#introduction {
  color: #4965bc;
}
</style>