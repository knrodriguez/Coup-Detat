import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'
import { RoomProvider, SocketProvider } from './context'
 
const App = (props) => {
    return (
        <RoomProvider>
            <SocketProvider>
                <Router>
                    <Routes />
                </Router>
            </SocketProvider>
        </RoomProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));