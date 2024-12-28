import * as gameService from '../Service/gameService.js';

// 处理连接时的事件
export const handleSocketConnection = (io, socket) => {
  console.log('New client connected');
  //监听每个新客户端的连接事件，当有客户端成功连接到服务器时执行此回调
  //每个连接的客户端都会分配一个唯一的socket对象，用于和该客户端进行通信
  // 创建房间
  socket.on('createRoom', (username, roomId) => {
    gameService.createRoom(socket, username, roomId);
  });
  
  // 加入房间
  socket.on('joinRoom',(username, roomId) => {
    gameService.joinRoom(io,socket, username, roomId);
  });
  
  // 玩家准备开始游戏
  socket.on('startGame',(roomId) => {
    gameService.startGame(io, socket, roomId);
  });
  
  socket.on('getQuestions', (roomId) => {
    gameService.getQuestions(io, roomId);
  });

  // 提交答案
  socket.on('submitAnswer', (roomId, username, question_index, answer_index, timer) => {
    gameService.submitAnswer(io,socket, roomId, username, question_index, answer_index, timer);
  });

  socket.on('disconnect', () => {
    gameService.onDisconnect();
  });
};
