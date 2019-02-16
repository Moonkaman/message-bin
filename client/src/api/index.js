import openSocket from 'socket.io-client';

const socket = openSocket('https://message-bin-nb.herokuapp.com/');

function connect(cb) {
  socket.on('connected', (message,time) => {
    cb(message,time);
  })
}

function recieveMessage(cb) {
  socket.on('message', (message,name,time) => {
    cb(message,name,time)
  })
}

function sendMessage(message, name) {
  socket.emit('message', message, name);
}

export { connect, sendMessage, recieveMessage };