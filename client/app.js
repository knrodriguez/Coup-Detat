import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'
import SocketContext, {socket} from './context/socket'
import RoomProvider from './context/room';
 
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