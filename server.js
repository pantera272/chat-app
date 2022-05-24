const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => { 
  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('newUser', (user) => {
    users.push(user);
    socket.broadcast.emit('newUser', user);
  });

  socket.on('disconnect', () => {
    const index = users.indexOf(socket.id);
    users.splice(index, 1);
  })
});
