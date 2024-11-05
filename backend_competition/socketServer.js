import { Server as SocketIO } from 'socket.io';
import http from 'http';

const PORT = 3001; // Socket.IO 服务器的端口

const server = http.createServer();
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173", // 前端的地址
    methods: ["GET", "POST"]
  }
});

let rooms = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  // 创建房间
  socket.on('createRoom', (roomId) => {
    if (!rooms[roomId]) {
      rooms[roomId] = { players: [], questions: [], answers: {}, readyCount: 0, timer: null };
      socket.join(roomId);
      console.log(`Room ${roomId} created`);
      socket.emit('roomCreated', roomId);
    } else {
      socket.emit('error', 'Room already exists');
    }
  });

  // 加入房间
  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].players.push(socket.id);
      socket.join(roomId);
      console.log(`Player ${socket.id} joined room ${roomId}`);
      io.to(roomId).emit('playerJoined', socket.id);
    } else {
      socket.emit('error', 'Room does not exist');
    }
  });

  // 玩家准备开始游戏
  socket.on('startGame', async (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].readyCount += 1;
      socket.emit('waitingForOpponent');

      if (rooms[roomId].readyCount === 2) {
        const quizzes = await getQuizzesFromDatabase();
        rooms[roomId].questions = quizzes;
        io.to(roomId).emit('gameStarted', quizzes);

        // 启动倒计时
        startTimer(roomId);
        rooms[roomId].readyCount = 0; // 重置准备计数
      }
    } else {
      socket.emit('error', 'Room does not exist');
    }
  });

  // 提交答案
  socket.on('submitAnswer', (roomId, answer) => {
    rooms[roomId].answers[socket.id] = answer;
    io.to(roomId).emit('answerSubmitted', { playerId: socket.id, answer });
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
async function getQuizzesFromDatabase() {
  return [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" }
  ];
}
