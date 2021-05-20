import React, { useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { RoomContext } from './room';
import { useHistory } from 'react-router-dom';

export const SocketContext = React.createContext();
const socket = io.connect();

export default ({children}) => {
    const history = useHistory();
    const [error, setError] = useState('');
    const {room: [room, setRoom]} = useContext(RoomContext)
   
    socket.on('error', error => setError(error))
    socket.on("connect", () => 
        console.log('Persistent connection made to the server'));
    socket.on('joinedRoom', room => setRoom(room))
    socket.on('startedGame', room => {
        setRoom(room)
        history.push(`/games/${room.url}`)
    })

    const value = {socket, error: [error, setError]}

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
} 
