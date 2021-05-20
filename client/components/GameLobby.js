import React, { useContext } from 'react';
import { SocketContext, RoomContext } from '../context';

export default function GameLobby ({startGame, error}) {
    const {room: [room, setRoom]} = useContext(RoomContext);
    const {socket} = useContext(SocketContext)

    return (
        <div>
            { room.host === socket.id ? 
                <>
                    Here is your game code! Share with your friends to start a Coup!<br/>
                    {room.code}<br/>
                    <button type='button' onClick={startGame}>Start Game!</button> 
                    {error}<br/>
                </> :
                <>
                    Waiting for the host to start the game!<br/>
                </>
            }
            { room.users && 
                Object.values(room.users).map(user => <>{user}<br/></>)
            }
        </div>
    )
}