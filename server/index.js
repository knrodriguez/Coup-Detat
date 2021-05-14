const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const socketio = require('socket.io');
const { createRoom, joinRoom, startGame } = require('./socket')

app.use(express.static(__dirname + '/../public'))

app.get('*', (req, res, next) => {
  try {
      res.sendFile(__dirname + '/../public/index.html')
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
    console.log('from create room',rooms)
    socket.emit('joinedRoom', createRoom(socket, user));
    callback(true)
  })

  socket.on('joinRoom', (code, user, callback) => {
    console.log('in join room', rooms, rooms[code])
    io.in(code).emit('joinedRoom', joinRoom(socket, code, user));
    callback(true)
  })

  socket.on('startGame', (room) => {
    io.in(room.code).emit('startedGame', startGame(room));
    console.log(rooms[room.code])
  })

  socket.on('shuffleDeck', deck => {
    io.sockets.emit('updateDeck', deck);
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