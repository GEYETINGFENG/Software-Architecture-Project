<script>

import quiz from "@/views/Quiz.vue";

export default {
  name: "QuizResult",
  props:{
    username:{
      type: String,
      required: true
    },
    socket:{
      required: true
    }
  },
  data(){
    return{
      roomID: 111,
      quizTime: 100,
      accuracy: 0,
      quizResult:[
            {
              question: "I have cities, but no houses. I have forests, but no trees. I have rivers, but no water. What am I?",
              options: ["A map", "A dream", "A movie", "A painting"],
              user_answer: "A map",
              answer: "A map"
            },

            {
              question: "The more you take, the more you leave behind. What am I?",
              options: ["Time", "Footsteps", "Memory", "Holes"],
              user_answer: "Time",
              answer: "Footsteps"
            },

            {
              question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
              options: ["The letter 'M'", "A star", "An eclipse", "A century"],
              user_answer: "The letter 'M'",
              answer: "The letter 'M'"
            },

            {
              question: "What has keys but can't open locks?",
              options: ["A piano", "A map", "A computer", "A treasure chest"],
              user_answer: "A piano",
              answer: "A piano"
            },

            {
              question: "If two’s company and three’s a crowd, what are four and five?",
              options: ["A party", "Nine", "A team", "A band"],
              user_answer: "A party",
              answer: "Nine"
            },

            {
              question: "What is so fragile that saying its name breaks it?",
              options: ["Silence", "Glass", "Love", "Trust"],
              user_answer: "Silence",
              answer: "Silence"
            },

            {
              question: "What is always in front of you but can’t be seen?",
              options: ["The future", "Air", "Time", "A mirror"],
              user_answer: "The future",
              answer: "The future"
            },

            {
              question: "I am not alive, but I grow; I don’t have lungs, but I need air; I don’t have a mouth, but water kills me. What am I?",
              options: ["Fire", "Clouds", "A plant", "A shadow"],
              user_answer: "Fire",
              answer: "Fire"
            },

            {
              question: "What can travel around the world while staying in the corner?",
              options: ["A stamp", "A clock", "A letter", "A satellite"],
              user_answer: "A stamp",
              answer: "A stamp"
            },

            {
              question: "What has a head, a tail, but no body?",
              options: ["A coin", "A snake", "A shadow", "A comet"],
              user_answer: "A coin",
              answer: "A coin"
            }
      ]
    }
  },
  methods:{
    calAccuracy(){
      let quizResultNum = this.quizResult.length;
      let rightAnswerNum = 0;
      for (let i=0;i<quizResultNum;i++){
        if(this.quizResult[i].answer === this.quizResult[i].user_answer){
          rightAnswerNum++;
        }
      }
      this.accuracy = rightAnswerNum/quizResultNum;
    }
  },
  mounted() {
    // 计算准确率



  }
}



</script>

<template>
<div class="result-container">
  <div class="detail-view">
    <ul>
      <li class="detail-view-row">
        <div>用户名</div>
        <div>{{username}}</div>
      </li>
      <li class="detail-view-row">
        <div>房间ID</div>
        <div>{{roomID}}</div>
      </li>
      <li class="detail-view-row">
        <div>答题时间</div>
        <div>{{quizTime}}</div>
      </li>
      <li class="detail-view-row">
        <div>准确率</div>
        <div>{{accuracy}}</div>
      </li>
    </ul>
  </div>
  <div class="compare-tag"></div>
  <div class="detail-view">
    <ul>
      <li class="detail-view-row">
        <div>用户名</div>
        <div>{{username}}</div>
      </li>
      <li class="detail-view-row">
        <div>房间ID</div>
        <div>{{roomID}}</div>
      </li>
      <li class="detail-view-row">
        <div>答题时间</div>
        <div>{{quizTime}}</div>
      </li>
      <li class="detail-view-row">
        <div>准确率</div>
        <div>{{accuracy}}</div>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped>
.result-container{
    max-width: 800px;
    min-width: 400px;
    padding: 20px;
    align-self: center;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    flex-direction: row;

    display: grid;
    grid-template-columns: 1fr 0.1fr 1fr;
}
.detail-view ul{
  list-style: none;
  padding: 0 5%;
}

.detail-view-row{
  display: flex;
}

</style>

/*[
{
question: "I have cities, but no houses. I have forests, but no trees. I have rivers, but no water. What am I?",
options: ["A map", "A dream", "A movie", "A painting"],
user_answer: "A map",
answer: "A map"
},

{
question: "The more you take, the more you leave behind. What am I?",
options: ["Time", "Footsteps", "Memory", "Holes"],
answer: "Footsteps"
},

{
question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
options: ["The letter 'M'", "A star", "An eclipse", "A century"],
answer: "The letter 'M'"
},

{
question: "What has keys but can't open locks?",
options: ["A piano", "A map", "A computer", "A treasure chest"],
answer: "A piano"
},

{
question: "If two’s company and three’s a crowd, what are four and five?",
options: ["A party", "Nine", "A team", "A band"],
answer: "Nine"
},

{
question: "What is so fragile that saying its name breaks it?",
options: ["Silence", "Glass", "Love", "Trust"],
answer: "Silence"
},

{
question: "What is always in front of you but can’t be seen?",
options: ["The future", "Air", "Time", "A mirror"],
answer: "The future"
},

{
question: "I am not alive, but I grow; I don’t have lungs, but I need air; I don’t have a mouth, but water kills me. What am I?",
options: ["Fire", "Clouds", "A plant", "A shadow"],
answer: "Fire"
},

{
question: "What can travel around the world while staying in the corner?",
options: ["A stamp", "A clock", "A letter", "A satellite"],
answer: "A stamp"
},

{
question: "What has a head, a tail, but no body?",
options: ["A coin", "A snake", "A shadow", "A comet"],
answer: "A coin"
}
];*/