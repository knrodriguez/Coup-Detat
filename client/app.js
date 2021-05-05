import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'
import SocketContext, {socket} from './context/socket'

const App = (props) => {
    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <Routes />
            </Router>
        </SocketContext.Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));