const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`new User connected ${socket}`);


  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to Chat App!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User has joined!',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnected from user');
  });
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
