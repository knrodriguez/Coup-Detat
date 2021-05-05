import React from 'react';
import { io } from 'socket.io-client';

export const socket = io();
socket.emit('message', 'from context')
socket.on("connect", () => {
    // either with send()
    socket.send("Hello from the frontend!");

    // or with emit() and custom event names
    socket.emit("salutations", 
        "Hello!", { "mr": "john" }, 
        Uint8Array.from([1, 2, 3, 4]));

    // handle the event sent with socket.send()
    socket.on("message", data => {
    console.log(data);
    });

    // handle the event sent with socket.emit()
    socket.on("greetings", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
    });
});
export default React.createContext();
