<template>
  <div>
    <div class="quiz-answering">
      <div class="quiz-answering__question">
        
      </div>
      <div class="quiz-answering__answers">
        <button v-for="answer in puzzle.answers" :key="answer" @click="submitAnswer(answer)">{{ answer }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: "QuizContent",
  methods:{
    test(){
      this.socket.emit('getQuestions', this.roomID);
    }

  },
  data() {
    return {
      socket: null,
      puzzle: null,
    };
  },
  props: {
    roomID: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.socket = io('http://localhost:3001');


    this.socket.emit('getQuestions', this.roomID);

    this.socket.on('questions', async (puzzle) => {
      try {
        console.log(puzzle);
        this.puzzle = puzzle;
      } catch (error) {
        console.error("Error receiving questions from server", error);
      }
    });
  },
}
</script>

<style scoped>

</style>