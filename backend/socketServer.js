import { Server as SocketIO } from 'socket.io';
import http from 'http';
import { connectMongoDB} from './config/database.js';
import { handleSocketConnection } from './Controller/gameController.js';
const PORT = 3001; // Socket.IO 服务器的端口
const server = http.createServer();
const io = new SocketIO(server, {
  cors: {
    origin: ["http://localhost:5173","http://10.252.145.181:5173"], // 前端的地址
    methods: ["GET", "POST"]
  }
});

let rooms = {};

// 链接数据库
connectMongoDB();

// 监听连接事件
io.on('connection', (socket) => {
  handleSocketConnection(io, socket);
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
