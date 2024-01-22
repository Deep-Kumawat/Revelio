// let socket = io();
// console.log(socket);
// let form = document.getElementById('chatForm');
// let messageBoxValue = document.getElementById('message_box').value;

// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     socket.emit('message', messageBoxValue);
// });


var socket = io();

  var form = document.getElementById('chatForm');
  var input = document.getElementById('message_box');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('message', input.value);
      input.value = '';
    }
  });