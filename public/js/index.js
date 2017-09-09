var socket = io();

socket.on('connect', function () {
  console.log("connected to server");

  socket.emit('createMessage', {
    to: "someone",
    text: "the stuff I want to say"
  });
});

socket.on('disconnect', function (){
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
