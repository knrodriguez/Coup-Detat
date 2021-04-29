import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'

const App = (props) => {
    return (
        <Router>
            <Routes />
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));