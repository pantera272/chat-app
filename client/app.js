const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

const socket = io();
socket.on('message',(event) => { addMessage(event.author, event.content) });
socket.on('newUser',(event) => { newUser(event.user) });

function login(e){
  e.preventDefault();
  const user = userNameInput.value;
  if(user == ''){
    alert('Proszę wprowadzić nazwę użytkownika!')
  } else {
    userName = user;
    socket.emit('newUser', {user : userName, socket : socket.id});
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

function sendMessage(e){
  e.preventDefault();
  if(messageContentInput.value == ''){
    alert('Proszę wpisać wiadomość!')
  } else {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContentInput.value })
    messageContentInput.value = '';
  }
}

function addMessage(author, content){
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  author == userName ? message.classList.add('message--self') :'';
  message.innerHTML = `
    <h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">${content}</div>
  `;
  messagesList.appendChild(message);
}

function newUser(user){
  const newUser = document.createElement('li');
  newUser.classList.add('message','message__user');
  newUser.innerHTML = `<div><i>Do czatu dołączył: ${user}</i><div>`;
  messagesList.appendChild(newUser);
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
