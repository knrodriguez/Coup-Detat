import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'
import SocketContext, {socket} from './context/socket'

const App = (props) => {
    const rooms = ['Room1', 'Room2', 'Room3']
    window.localStorage.setItem('rooms', JSON.stringify(rooms));
    
    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <Routes />
            </Router>
        </SocketContext.Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));