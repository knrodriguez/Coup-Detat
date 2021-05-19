import React, { useState } from 'react';

export const RoomContext = React.createContext();

export default ({children}) => {
    const [room, setRoom] = useState({});
    const value = {room: [room, setRoom]}

    return (
        <RoomContext.Provider value={value}>
            {children}
        </RoomContext.Provider>
    )
}