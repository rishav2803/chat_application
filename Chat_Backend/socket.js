const io=require('socket.io')(8080)

const socket = io => {
  io.on('connection', client => {
    console.log('New Connection');
  });
}