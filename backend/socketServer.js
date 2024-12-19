import { Server as SocketIO } from 'socket.io';
import http from 'http';

const PORT = 3001; // Socket.IO 服务器的端口
import { Quiz } from './models/Quiz.js'; 
import mongoose from 'mongoose';
const server = http.createServer();


// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/SoftwareArchitecure', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

const io = new SocketIO(server, {
  cors: {
    origin: ["http://localhost:5173","http://10.252.145.181:5173"], // 前端的地址
    methods: ["GET", "POST"]
  }
});

let rooms = {};

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

// 模拟获取题目数据的函数
// 从 MongoDB 获取题目数据的函数
async function getQuizzesFromDatabase() {
  try {
    const quizzes = await Quiz.find({}, { _id: 0, question: 1, options: 1, answer: 1 }); // 查询题目、选项和答案
    return quizzes;
  } catch (error) {
    console.error('Error fetching quizzes from database:', error);
    throw error;
  }
}