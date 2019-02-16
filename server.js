require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 8000;

io.on('connection', socket => {
  console.log('User connected');
  io.sockets.emit('connected', moment().format('LTS'));

  socket.on('message', (newMessage,name) => {
    console.log(newMessage);
    console.log(name)
    io.sockets.emit('message', newMessage, name, moment().format('LTS'));
  })

  socket.on('disconnect', socket => {
    console.log('User disconnected');
  })
})

server.listen(port, _ => {
  console.log(`Server running on port ${port}`)
})