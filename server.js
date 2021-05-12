const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const socketio = require('socket.io');
const ALPHABET_START = 65;
const ALPHABET_END = 122;
const INVALID_CHARS_START = 91;
const INVALID_CHARS_END = 96;

app.use(express.static(__dirname + '/public'))

app.get('*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/public/index.html')
    } catch (error) {
        res.status(500).send(error)
    }
})

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log(`Listening on http://localhost:${server.address().port}`)

})

const io = socketio(server);

function rng(start, end, invalidStart = null, invalidEnd = null){
  let randomNum = Math.floor(Math.random() * (end - start) + start);
  if(randomNum >= invalidStart && randomNum <= invalidEnd) 
      return rng();
  return randomNum;
}

function createUrl(){
  let url = '';
  for(let i = 0; i < 16; i++){
      url += String.fromCharCode(
          rng(ALPHABET_START, ALPHABET_END, INVALID_CHARS_START, INVALID_CHARS_END))
  }
  return url;
}

function createGameCode(){
  let code = ''; 
  while(code.length < 4){
      code += String.fromCharCode(rng(65, 90))
  }
  if(io.sockets.adapter.rooms[code]) return createGameCode();
  return code;
}

const createRoom = (socket, user) => {
  let code = createGameCode();
  const room = {
    code,
    url: createUrl(),
    gameStarted: false,
    users: {[user.name]: socket.id}
  }
  io.sockets.adapter.rooms[code] = room
  socket.join(code)
  socket.emit('createdRoom', room)
}

const joinRoom = (socket, code, user) => {
  const room = io.sockets.adapter.rooms[code];
  if(!room.url) throw new Error('Cannot find room');
  room.users[user.name] = socket.id;
  socket.join(code)
  io.in(room.code).emit('joinedRoom', room)
}

const startGame = (io, room) => {
  room.gameStarted = true;
  io.in(room.code).emit('startedGame');
}

io.on("connection", socket => {
  console.log('a new user has joined in socket', socket.id)
  socket.on('createRoom', user => createRoom(socket, user))
  socket.on('joinRoom', (code, user) => joinRoom(socket, code, user))
  socket.on('startGame', room => startGame(io, room))
  socket.on('shuffleDeck', deck => {
    io.sockets.emit('updateDeck', deck);
  })
  socket.on('disconnect', () => {
    console.log('user has disconnected from socket', socket.id)
  })
  socket.on('updateDeck', shuffledDeck => {
    io.sockets.emit('shuffledDeck', shuffledDeck)
  })
  socket.on('endGame', (url) => {
    io.in(url).disconnectSockets(url);
  })
});
