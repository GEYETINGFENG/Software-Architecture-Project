<template>
  <div class="quiz-container">
    <div class="quiz-content">
      <div v-if="puzzle" class="puzzle-body">
        <h4>{{ question_index + 1 }} / {{ puzzle.length }}</h4>
        <h2 v-if="puzzle">{{ question_index <= 9 ? puzzle[question_index].question : '' }}</h2>
      </div>
      <h4 v-else>Loading...</h4>
    </div>
    <div class="quiz-answering">
      <div v-if="puzzle">
        <div class="timer">Time left: {{ timer }} seconds</div>
        <div class="answer_button_group">
          <button @click="this.answer_index = 0" :class="{'active': answer_index === 0}">{{ puzzle[question_index].options[0] }}</button>
          <button @click="this.answer_index = 1" :class="{'active': answer_index === 1}">{{ puzzle[question_index].options[1] }}</button>
          <button @click="this.answer_index = 2" :class="{'active': answer_index === 2}">{{ puzzle[question_index].options[2] }}</button>
          <button @click="this.answer_index = 3" :class="{'active': answer_index === 3}">{{ puzzle[question_index].options[3] }}</button>
        </div>
        <div class="questionManagement">
          <el-button type="success" @click="submitAnswer" class="admitButton">{{ this.question_index < 9 ? 'Next' : 'Check Result' }}</el-button>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizContent',
  methods: {
    submitAnswer() {
      this.socket.emit('submitAnswer', this.roomID, this.username, this.question_index, this.answer_index,this.timer);
      this.question_index++;
      this.answer_index = 0;
    },
    startTimer() {
      this.timer = 150.000;
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer = (this.timer - 0.005).toFixed(3);
        } else {
          this.submitAnswer();
          this.completed = true;
        }
      }, 10);
    },
  },

  data() {
    return {
      puzzle: null,
      question_index: 0,
      answer_index: 0,
      completed: false,
      answeredQuestions: [],
      timer: 0,
      timerInterval: null,
    };
  },
  props: {
    roomID: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    socket:{
      required: true
    },
    stopTimer: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    completed(newValue) {
      if (newValue) {
        this.$emit('game-completed', newValue);

      }
    },
    answeredQuestions(newValue) {
      this.$emit('answeredQuestions', newValue);
    },
    userTimes(newValue) {
      this.$emit('userTimes', newValue);
    },
    stopTimer(newValue){
      clearInterval(this.timerInterval);
    }
  },
  mounted() {

    this.socket.on('questions', async (puzzle) => {
      try {
        this.puzzle = puzzle;
        this.startTimer();
      } catch (error) {
        console.error('Error receiving questions from server', error);
      }
    });
  },
};
</script>

<style scoped>
.puzzle-body h2{
  font-size: 20px;
  margin-bottom: 30px;
}

.puzzle-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.quiz-container {
  min-width: 1000px;
  max-width: 1000px;
  margin: 200px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  flex-direction: row;
}

.answer_button_group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.questionManagement {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.answer_button_group button {
  margin: 0 5px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
}

.admitButton{
  margin: 0 5px;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  width: 20%;
}

.answer_button_group button.active {
  background-color: #007BFF;
  color: white;
  border-color: #007BFF;
}

.timer {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}
</style>