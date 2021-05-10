const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const socketio = require('socket.io');

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

io.on("connection", socket => {
  console.log('a new user has joined in socket', socket.id)
  socket.on('startGame', (deck) => {
    io.sockets.emit('updateDeck', deck);
  })
  socket.on('disconnect', () => {
    console.log('user has disconnected from socket', socket.id)
  })
  socket.on('updateDeck', shuffledDeck => {
    io.sockets.emit('shuffledDeck', shuffledDeck)
  })

//   // either with send()
//   socket.send("Hello from the backend!");

//   // or with emit() and custom event names
//   socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

//   // handle the event sent with socket.send()
//   socket.on("message", (data) => {
//     console.log(data);
//   });

//   // handle the event sent with socket.emit()
//   socket.on("salutations", (elem1, elem2, elem3) => {
//     console.log(elem1, elem2, elem3);
//   });
});
