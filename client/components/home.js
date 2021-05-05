import React, { useContext } from 'react';
import SocketContext from '../context/socket';

export const Home = (props) => {
    console.log('in home component')
    // const socket = io();
    const socket = useContext(SocketContext);
    socket.on('message', data => console.log('FUCKING HELP ME!'))
    socket.emit('message', 'stuff')
    return (
        <div>
            HOMEPAGE
        </div>
    )
}