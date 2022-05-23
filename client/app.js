const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

function login(e){
  e.preventDefault();
  const user = userNameInput.value;
  if(user == ''){
    alert('Proszę wprowadzić nazwę użytkownika!')
  } else {
    userName = user;
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
    messageContentInput.value = '';
  }
}

function addMessage(author, messageInput){
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  author == userName ? message.classList.add('message--self') :'';
  message.innerHTML = `
    <h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">${messageInput}</div>
  `;
  messagesList.appendChild(message);
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);