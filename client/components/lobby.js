import React, {useContext, useEffect, useState} from 'react';
import { getFromLocalStorage } from '../FUNCTIONS'
import { useHistory } from 'react-router-dom';
import { SocketContext, RoomContext } from '../context'

export const Lobby = (props) => {
    const user = getFromLocalStorage('user');
    const [code, setCode] = useState('');
    const [showModal, setShowModal] = useState(false)
    const history = useHistory();
    const socket = useContext(SocketContext)
    const {room: [room, setRoom]} = useContext(RoomContext)

    socket.on('joinedRoom', room => setRoom(room))
    socket.on('startedGame', () => history.push(`/games/${room.url}`))

    if(!user) history.push('/')

    function changeRoomCode (evt){
        setCode(evt.target.value)
    }

    function joinRoom(evt){
        evt.preventDefault();
        socket.emit('joinRoom', code, user, setShowModal)
    }

    function createGame() {
        socket.emit('createRoom', user, setShowModal)
    }

    function startGame(){
        socket.emit('startGame', room)
    }

    const modal = (
        <div>
            {
                room.host === socket.id ? 
                <>
                    Here is your game code! Share with your friends to start a Coup!<br/>
                    {room.code}<br/>
                    <button type='button' onClick={startGame}>Start Game!</button><br/>
                </> :
                <>
                    Waiting for the host to start the game!<br/>
                </>
            }
            {room.users && Object.keys(room.users).map(user => <>{user}<br/></>)}
        </div>
    )

    if(showModal) return modal;
    return(
        <div>
            <button type='button' onClick={createGame}>Create A Game</button>
            <h2>or</h2>
            <form onSubmit={joinRoom}>
                <label>Enter A Game Code:</label>
                <input type='text' onChange={changeRoomCode}></input>
                <button type='submit'>Join Game</button>
            </form>
        </div>
    )
}