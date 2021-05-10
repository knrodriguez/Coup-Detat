import React from 'react';
import { io } from 'socket.io-client';

export const socket = io.connect();
socket.on("connect", () => {
    console.log('I have made a persistent connection to the serber')
});
export default React.createContext();
