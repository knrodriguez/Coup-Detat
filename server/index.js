const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const socketio = require('socket.io');
const path = require('path')
const { createRoom, joinRoom, startGame, initializeGame } = require('./socket')

app.use(express.static(__dirname + '/../public'))

app.get('*', (req, res, next) => {
  try {
      res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  } catch (error) {
      res.status(500).send(error)
  }
})

const server = app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${server.address().port}`)
})

const io = socketio(server);
const rooms = io.sockets.adapter.rooms;

io.on("connection", socket => {
  console.log('a new user has joined in socket', socket.id)
  console.log('all rooms', rooms)
  
  socket.on('createRoom', (user, callback) => {
    try {
      const room = createRoom(socket, user);
      
      if(rooms.get(room.code).has(socket.id)){
        socket.emit('joinedRoom', room);
        callback(true);
      }
    } catch(error){
      callback(false)
    }
  })

  socket.on('joinRoom', (code, user, callback) => {
    try{
      const room = joinRoom(socket, code, user);

      if(rooms.get(code).has(socket.id)){
        io.in(code).emit('joinedRoom', room);
        callback(true)
      } 
    } catch(error){
      callback(false)
    }
  })

  socket.on('startGame', room => {
      const code = room.code;
      room = startGame(code);

      if(room.error){
        socket.emit('error', room.error)
        delete room.error;
      }
      if(room.gameStarted){
        io.in(room.code).emit('startedGame', room);
      }
  })

  socket.on('shuffleDeck', deck => {
    io.sockets.emit('updateDeck', deck);
  })

  socket.on('initializeGame', (shuffledDeck, room) => {
    initializeGame(socket, shuffledDeck, room)
  })

  socket.on('disconnect', () => {
    console.log('user has disconnected from socket', socket.id)
    for(const code in rooms ){
      let room = rooms[code]
      console.log('the curr room', room)
      if(room.sockets.includes(socket)){
        socket.leave(code);
        room.sockets = room.sockets.filter(s => s !== socket)
        console.log('room after socket leaving', room)
      }
      if(!room.sockets.length) delete rooms[code]
    }
    console.log(rooms)
  })

  socket.on('updateDeck', shuffledDeck => {
    io.sockets.emit('shuffledDeck', shuffledDeck)
  })

  socket.on('endGame', (url) => {
    io.in(url).disconnectSockets(url);
  })

});

module.exports = rooms;