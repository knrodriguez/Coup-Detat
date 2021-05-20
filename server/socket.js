// const rooms = require('./index');
const rooms = {};
const { createUrl, createGameCode } = require('./helpers')
const MIN_PLAYERS = 2, MAX_PLAYERS = 6;

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
    joinRoom(socket, code, user)
    return room;
}

const joinRoom = (socket, code, user) => {
    socket.join(code);
    rooms[code].users[socket.id] = user.name;
    return rooms[code];
}

const startGame = code => {
    const room = rooms[code];
    try{
        const numUsers = Object.keys(room.users).length;
        if(numUsers >= MIN_PLAYERS && numUsers <= MAX_PLAYERS)
            room.gameStarted = true;
        else 
            throw new Error('Not Enough Players')
    } catch(error) {
        room.error = error.message
    } finally {
        return room;
    }
}

const initializeGame = (socket, deck, room) => {

}

module.exports = {
    createRoom,
    joinRoom,
    startGame,
    initializeGame
}