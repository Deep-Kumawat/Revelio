let socket = io();
let form = document.getElementById('chatForm');
let input = document.getElementById('message_box');

function displayMessage(message){
    socket.emit('removeTypingFeedback');
    const chats = document.getElementById('chats');
    const messageLi = document.createElement('li');
    const messageLiTextNode = document.createTextNode(message);
    messageLi.appendChild(messageLiTextNode);
    chats.appendChild(messageLi);
    // chats.classList.add('rightMessage');
}

function showTyping(){
    const typingDiv = document.getElementById('typingTextDiv');
    typingDiv.style.visibility = 'visible';
}

function hideTyping(){
    const typingDiv = document.getElementById('typingTextDiv');
    typingDiv.style.visibility = 'hidden';
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        displayMessage(input.value);
        socket.emit('message', input.value);
        input.value = '';
}
}); 

input.addEventListener('focus', function(e) {
    e.preventDefault();
    socket.emit('addTypingFeedback');
    
});

input.addEventListener('input', function(e) {
    e.preventDefault();
    socket.emit('addTypingFeedback');
    
});

input.addEventListener('blur', function(e) {
    e.preventDefault();
    socket.emit('removeTypingFeedback');
});

socket.on('showMessage', (value)=>{
    displayMessage(value);
});

socket.on('showTypingFeedback', ()=>{
    showTyping();
});

socket.on('hideTypingFeedback', ()=>{
    hideTyping();
});