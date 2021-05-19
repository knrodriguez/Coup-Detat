import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'
import { RoomProvider, SocketContext, socket } from './context'
 
const App = (props) => {
    return (
            <SocketContext.Provider value={socket}>
                <RoomProvider>
                    <Router>
                        <Routes />
                    </Router>
                </RoomProvider>
            </SocketContext.Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));