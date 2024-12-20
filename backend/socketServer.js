import { Server as SocketIO } from 'socket.io';
import http from 'http';
import { Quiz } from './models/Quiz.js'; 
const PORT = 3001; // Socket.IO 服务器的端口
import mongoose from 'mongoose';
const server = http.createServer();
const io = new SocketIO(server, {
  cors: {
    origin: ["http://localhost:5174","http://10.252.145.181:5174"], // 前端的地址
    methods: ["GET", "POST"]
  }
});

let rooms = {};

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/SoftwareArchitecure', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
io.on('connection', (socket) => {
  console.log('New client connected');
//监听每个新客户端的连接事件，当有客户端成功连接到服务器时执行此回调
//每个连接的客户端都会分配一个唯一的socket对象，用于和该客户端进行通信
  // 创建房间
  socket.on('createRoom', (username, roomId) => {
    //监听客户端发送的createRoom事件，当客户端请求创建一个房间时执行该回调
    if (!rooms[roomId]) {// 如果房间不存在
      rooms[roomId] = {players: [], questions: [], readyCount:0, timer: {}};
      rooms[roomId].players.push({ username: username, correctAnswers: 0 });
      socket.join(roomId);
      socket.emit('roomCreated', roomId);
    } else {
      socket.emit('error', 'Room already exists');
    }
  });

  // 加入房间
  socket.on('joinRoom', (username, roomId) => {
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
  });

  // 玩家准备开始游戏
  socket.on('startGame', async (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].readyCount += 1;

      if (rooms[roomId].readyCount === 2) {
        io.to(roomId).emit('gameStarted');
        rooms[roomId].readyCount = 0;

    } else {
      socket.emit('error', 'Room does not exist');
    }
  }
  });

  socket.on('getQuestions',  async (roomId) => {
    const quizzes = await getQuizzesFromDatabase();
    rooms[roomId].questions = quizzes;
    io.emit('questions', quizzes);
  });


  // 提交答案
  socket.on('submitAnswer', (roomId, username, question_index, answer_index,timer) => {
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
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// 启动计时器函数
function startTimer(roomId) {
  let countdown = 30; // 30秒倒计时
  rooms[roomId].timer = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      io.to(roomId).emit('timer', countdown); // 每秒发送剩余时间
    } else {
      clearInterval(rooms[roomId].timer);
      io.to(roomId).emit('timeUp'); // 时间到事件
    }
  }, 1000);
}

// 启动 Socket.IO 服务器
server.listen(PORT, () => {
  console.log(`Socket.IO server is running on http://localhost:${PORT}`);
});

// async function getQuizzesFromDatabase() {
//   try {
//     const quizzes = await Quiz.find({}, { _id: 0, question: 1, options: 1, answer: 1 }); // 查询题目、选项和答案
//     console.log('以下是返回的问题集合',quizzes);
//     return quizzes;
//   } catch (error) {
//     console.error('Error fetching quizzes from database:', error);
//     throw error;
//   }
// }

// 模拟获取题目数据的函数
async function
getQuizzesFromDatabase() {
  return [
    {
      question: "I have cities, but no houses. I have forests, but no trees. I have rivers, but no water. What am I?",
      options: ["A map", "A dream", "A movie", "A painting"],
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
  ];
}