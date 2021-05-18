import React, { useContext, useState } from 'react';

export const RoomContext = React.createContext();

export function RoomProvider ({children}) {
    const [room, setRoom] = useState({});
    const value = { room: [room, setRoom] }

    return (
        <RoomContext.Provider value={value}>
            {children}
        </RoomContext.Provider>
    )
}
