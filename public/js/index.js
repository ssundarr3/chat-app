var socket = io();

socket.on('connect', function () {
  console.log("connected to server");
});

socket.on('disconnect', function (){
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  var li = document.createElement('li');
  li.innerHTML = `${message.from}: ${message.text}`;

  document.getElementById('messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageBox = document.getElementById('messageInputBox');

  socket.emit('createMessage', {
    from: 'User',
    text: messageBox.value
  }, function () {
    messageBox.value = "";
  });
});
