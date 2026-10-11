const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  // Khi có người tham gia vào mã phòng cụ thể
  socket.on('join_room', (roomCode) => {
    socket.join(roomCode);
  });

  // Nhận dữ liệu (tọa độ, đạn bắn, trạng thái) và gửi cho người còn lại trong phòng
  socket.on('game_data', (data) => {
    socket.to(data.roomCode).emit('game_data', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});