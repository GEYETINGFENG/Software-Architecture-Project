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
//监听每个新客户端的连接事件，当有客户端成功连接到服务器时执行此回调
//每个连接的客户端都会分配一个唯一的socket对象，用于和该客户端进行通信
  // 创建房间
  socket.on('createRoom', (roomId) => {
    //监听客户端发送的createRoom事件，当客户端请求创建一个房间时执行该回调
    if (!rooms[roomId]) {// 如果房间不存在
      rooms[roomId] = { players: [], questions: [], answers: {}, readyCount: 0, timer: null };
      //初始化房间信息:房间内玩家ID列表，问题数据，玩家答案，玩家数量，倒计时
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
      rooms[roomId].players.push(socket.id);//player是存储房间内玩家ID的数组
      socket.join(roomId); //将客户端加入房间
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
