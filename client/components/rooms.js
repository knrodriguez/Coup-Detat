import React, {useContext, useState} from 'react';
import { getFromLocalStorage } from '../FUNCTIONS'
import { useHistory } from 'react-router-dom';
import { SocketContext, RoomContext } from '../context'
import GameLobby from './GameLobby'

export default function Lobby (props) {
    const user = getFromLocalStorage('user');
    const history = useHistory();
    const [code, setCode] = useState(''),
          [showModal, setShowModal] = useState(false);
    const {room: [room, setRoom]} = useContext(RoomContext)
    const {socket, error: [error, setError]} = useContext(SocketContext)

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
        console.log('MODAL SHOW', showModal)
    }

    function startGame(){
        socket.emit('startGame', room)
    }

    console.log('SHOW MODAL', showModal)
    if(showModal) {
        return (<GameLobby startGame={startGame} error={error}/>)
    }
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

    // const modal = (
    //     <div>
    //         {
    //             room.host === socket.id ? 
    //             <>
    //                 Here is your game code! Share with your friends to start a Coup!<br/>
    //                 {room.code}<br/>
    //                 <button type='button' onClick={startGame}>Start Game!</button> 
    //                 {error}<br/>
    //             </> :
    //             <>
    //                 Waiting for the host to start the game!<br/>
    //             </>
    //         }
    //         {room.users && Object.values(room.users).map(user => <>{user}<br/></>)}
    //     </div>
    // )
