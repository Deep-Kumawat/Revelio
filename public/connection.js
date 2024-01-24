let socket = io();
let form = document.getElementById('chatForm');
let input = document.getElementById('message_box');

function displayMessage(message){
    const chats = document.getElementById('chats');
    const messageLi = document.createElement('li');
    const messageLiTextNode = document.createTextNode(message);
    messageLi.appendChild(messageLiTextNode);
    chats.appendChild(messageLi);
    // chats.classList.add('rightMessage');
}

form.addEventListener('submit', function(e) {
e.preventDefault();
if (input.value) {
    displayMessage(input.value);
    socket.emit('message', input.value);
    input.value = '';
}
}); 

socket.on('showMessage', (value)=>{
    console.log('inside on showMessage');
    displayMessage(value);
})