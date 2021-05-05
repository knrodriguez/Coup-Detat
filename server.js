const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const PORT = process.env.PORT || 1337;
const io = require('socket.io')(httpServer);

app.use(express.static(__dirname + '/public'))

app.get('*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/public/index.html')
    } catch (error) {
        res.status(500).send(error)
    }
})

io.on("connection", socket => {
  console.log('a new user has joined')

  // either with send()
  socket.send("Hello from the backend!");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
