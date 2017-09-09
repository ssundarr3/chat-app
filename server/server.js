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

  socket.on('disconnect', () => {
    console.log('disconnected from user');
  });

  socket.emit('newMessage', {
    from: 'myName',
    text: 'stuff myname wants to say'
  });

  socket.on('createMessage', (newMessage) => {
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
  });

  socket.emit('newMessage', {
    from: "person",
    text: "the text from the person"
  });
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
