const rooms = require('./index');
// const rooms = io.sockets.adapter.rooms;
const { createUrl, createGameCode } = require('./helpers')

const createRoom = (socket, user) => {
    const code = createGameCode();
    const room = {
      code,
      gameStarted: false,
      host: socket.id,
      url: `${createUrl()}${code}`,
      users: {}
    }
    rooms[code] = room;
    return joinRoom(socket, code, user)
}

const validRoom = (code) => {
    if (code in rooms) return rooms[code]
    throw new Error('Invalid room')
}

const joinRoom = (socket, code, user) => {
    if(validRoom(code)) {
        rooms[code].users[user.name] = socket.id;
        socket.join(code);
        return rooms[code]
    }
}

const startGame = room => rooms[room.code].gameStarted = true;

const initializeGame = (socket, deck, room) => {

}

module.exports = {
    createRoom,
    joinRoom,
    startGame,
    initializeGame
}