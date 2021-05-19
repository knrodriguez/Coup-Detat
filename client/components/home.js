import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../context/socket'

export const Home = (props) => {
    const [name, setName] = useState('');
    const history = useHistory();
    const socket = useContext(SocketContext);

    function changeName (evt) {
        setName(evt.target.value);
    }

    function submitName (evt){
        evt.preventDefault();
        localStorage.setItem('user', JSON.stringify({name, socketId: socket.id}));
        history.push('/rooms')
    }
    
    return (
        <div>
            <form onSubmit={submitName} onChange={changeName}>
                <label>Please enter your name:</label>
                <input type='text' name='name' ></input>
                <button type='submit'>Let's Play</button>
            </form>
        </div>
    )
}