const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`new User connected ${socket}`);


  socket.emit('newMessage', generateMessage('Admin', 'Welcome to App!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'User has joined!'));

  socket.on('createMessage', (newMessage) => {
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
  });

  socket.on('disconnect', () => {
    console.log('disconnected from user');
  });
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
