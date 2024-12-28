import { Quiz } from '../../Model/Quiz.js';

let rooms = {};

// 创建房间
const createRoom = (socket, username, roomId) => {
    //监听客户端发送的createRoom事件，当客户端请求创建一个房间时执行该回调
    if (!rooms[roomId]) {// 如果房间不存在
      rooms[roomId] = {players: [], questions: [], readyCount:0, timer: {}};
      rooms[roomId].players.push({ username: username, correctAnswers: 0 });
      socket.join(roomId);
      socket.emit('roomCreated', roomId);
    } else {
      socket.emit('error', 'Room already exists');
    }
  };

// 加入房间
const joinRoom = (io, socket, username, roomId) => {
    if (rooms[roomId]) {
      if (rooms[roomId].players.length < 2) {
        rooms[roomId].players.push({ username: username, correctAnswers: 0 });
        socket.join(roomId); // 将客户端加入房间
        io.to(roomId).emit('playerJoined', roomId);
      } else {
        socket.emit('error', 'Room is full');
      }
    } else {
      socket.emit('error', 'Room does not exist');
    }
};

// 玩家准备开始游戏
const startGame = (io , socket, roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].readyCount += 1;

      if (rooms[roomId].readyCount === 2) {
        io.to(roomId).emit('gameStarted');
        rooms[roomId].readyCount = 0;

    } else {
      socket.emit('error', 'Room does not exist');
    }
  }
};

// 获取题目
const getQuestions = async (io,roomId) => {
    const quizzes = await getQuizzesFromDatabase();
    rooms[roomId].questions = quizzes;
    io.emit('questions', quizzes);
  };

// 提交答案
const submitAnswer = (io,socket, roomId, username, question_index, answer_index, timer) => {
    try {
      const question = rooms[roomId].questions[question_index];
      if (!question.user_answers) {
        question.user_answers = {};
      }
      question.user_answers[username] = question.options[answer_index];
      rooms[roomId].timer[username] = timer;

      if (question_index + 1 === rooms[roomId].questions.length) {
        console.log(rooms[roomId].timer);
        io.emit("AllQuestionCompleted", username, rooms[roomId].questions, rooms[roomId].timer);
        console.log(rooms[roomId].questions);
      }
    }catch (e){
      socket.disconnect();
      console.error(e);
    }
  };

async function getQuizzesFromDatabase() {
    try {
      const quizzes = await Quiz.find({}, { question: 1, options: 1, answer: 1 }).lean().exec(); // 查询题目、选项和答案
      console.log('以下是返回的问题集合',quizzes);
      console.log(typeof quizzes);
      return quizzes;
    } catch (error) {
      console.error('Error fetching quizzes from database:', error);
      throw error;
    }
  }
// 处理断开连接
const onDisconnect = () => {
    console.log('Client disconnected');
};

export{createRoom,joinRoom,startGame,getQuestions,submitAnswer,onDisconnect}