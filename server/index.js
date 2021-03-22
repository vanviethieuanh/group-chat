const PORT = 8080

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: '*'
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('message', message =>{
      console.log(message);
      io.emit('message',`${socket.id.substr(0,2)} said ${message}`)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

http.listen(PORT, () => {
  console.log(`🚀 listening on http://localhost:${PORT}/`);
    
});