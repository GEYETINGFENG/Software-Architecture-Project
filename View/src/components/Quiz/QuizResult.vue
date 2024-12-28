<script>

export default {
  name: "QuizResult",
  props:{
    username:{
      type: String,
      required: true
    },
    userTimes: {
      type: Object,
      required: true,
      // { userA:50.69, userB: 41.69}
    },
    user_result:{
      type: Object,
      required: false,
    },
    roomID:{
      type: String,
      required: true
    },
    socket:{
      required: true
    }
  },
  data(){
    return{
      quizTime: 100,
      other_username:""
    }
  },
  methods:{
    onConfirmButtonClick(){
      this.$emit("onConfirmButtonClick")
    }
  },
  computed:{
    /**
     * 计算属性，实时计算用户的准确率
     */
    user_accuracy(){
      let quizResultNum = this.user_result.length;
      let rightAnswerNum = 0;
      if(!this.user_result)return 0;
      for (let i=0;i<quizResultNum;i++){
        if(!this.user_result[i].user_answers){
          console.error("user_answers is not defined");
          return 0;
        }
        if(this.user_result[i].answer === this.user_result[i].user_answers[this.username]){
          rightAnswerNum++;
        }
      }
      if(quizResultNum===0)return 0;
      return rightAnswerNum/quizResultNum;
    },
    /**
     * 检测对手是否完成,
     * 如果所有题目的答案的长度都是2，那么对手就完成了
     */
    other_user_complete(){
      if(!this.userTimes)return false;
      if(this.user_result.length<=0)return false;
      for(let i=0;i<this.user_result.length;i++){
        if (Object.keys(this.user_result[i].user_answers).length<2){
          return false;
        }
      }
      return true;
    },
    /**
     * 计算属性，实时计算对手的准确率
     */
    other_user_accuracy(){
      let quizResultNum = 0;
      let rightAnswerNum = 0;
      if(!this.user_result)return 0;
      console.log(this.user_result);
      for (let i=0;i<this.user_result.length;i++){
        let usernames = Object.keys(this.user_result[i].user_answers);
        // 如果没有其他用户
        if(usernames.length < 2){
          continue;
        }
        // 如果有其他用户,更新用户名，并计算准确率
        for( let j=0;j<usernames.length;j++){
          console.log(usernames[j])
          if(usernames[j] !== this.username){
            this.other_username = usernames[j];
          }
        }
        quizResultNum++;
        if(this.user_result[i].user_answers[this.other_username]===this.user_result[i].answer){
          rightAnswerNum++;
        }
      }

      if(quizResultNum===0)return 0;
      return rightAnswerNum/quizResultNum;
    },
    /**
     * 判断是否胜利
     */
    compare(){
      if(this.user_accuracy!==0&&this.other_user_accuracy!==0){
        if(this.user_accuracy>this.other_user_accuracy){
          return "win";
        }else if(this.user_accuracy<this.other_user_accuracy){
          return "lose";
        }else{
          return "Tie";
        }
      }

      return "unknown";
    }
  }
}




</script>

<template>
  <div class="basic-container">
    <div class="result-container">
      <div class="compare-view">
        <div class="detail-view">
          <h3>Your Result</h3>
          <ul>
            <li class="detail-view-row">
              <div>Username</div>
              <div>{{username}}</div>
            </li>
            <li class="detail-view-row">
              <div>Room ID</div>
              <div>{{roomID}}</div>
            </li>
            <li class="detail-view-row">
              <div>Time Cost</div>
              <div>{{userTimes[username]?userTimes[username]:"unknown"}}</div>
            </li>
            <li class="detail-view-row">
              <div>Accuracy</div>
              <div>{{user_accuracy}}</div>
            </li>
          </ul>
        </div>
        <div class="compare-tag">
          <div v-if="compare==='win'">></div>
          <div v-else-if="compare==='lose'"><</div>
          <div v-else-if="compare==='Tie'">=</div>
          <div v-else>?</div>
        </div>
        <div class="detail-view">
          <h3>Rival</h3>
          <ul v-if="other_user_complete">
            <li class="detail-view-row">
              <div>Username</div>
              <div>{{other_username}}</div>
            </li>
            <li class="detail-view-row">
              <div>Room ID</div>
              <div>{{roomID}}</div>
            </li>
            <li class="detail-view-row">
              <div>Time Cost</div>
              <div>{{userTimes[other_username]?userTimes[other_username]:"...等待中"}}</div>
            </li>
            <li class="detail-view-row">
              <div>Accuracy</div>
              <div>{{other_user_accuracy}}</div>
            </li>
          </ul>
          <ul v-else>
            <li class="detail-view-row">
              <div>Username</div>
              <div>...Waiting</div>
            </li>
            <li class="detail-view-row">
              <div>Room ID</div>
              <div>{{roomID}}</div>
            </li>
            <li class="detail-view-row">
              <div>Time Cost</div>
              <div>...Waiting</div>
            </li>
            <li class="detail-view-row">
              <div>Accuracy</div>
              <div>...Waiting</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-view">
        <button type="button" @click="onConfirmButtonClick">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basic-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

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
    justify-content: center;
    align-items: center;
    margin-top: 160px;
}

.compare-view{
    display: grid;
    grid-template-columns: 1fr 0.1fr 1fr;
}

.detail-view{
  background-color: rgba(220, 213, 213, 0.6);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.detail-view h3{
  text-align: center;
}

.detail-view ul{
  list-style: none;
  padding: 0 5%;
}

.detail-view-row{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10%;
  line-height: 100%;
  padding: 5% 0;
}

.compare-tag{
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-view{
  display: flex;
  padding-top: 5%;
  align-items: center;
  justify-content: center;
}

.button-view button{
  border: none;
  border-radius: 10px;
  padding: 2% 5%;
  background-color: #efe3e3;
}

.button-view button:active{
  background-color: white;
}

</style>

