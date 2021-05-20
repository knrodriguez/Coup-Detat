import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {SocketContext} from '../context'
import {addToLocalStorage} from '../FUNCTIONS'

export default function Home (props) {
    const [name, setName] = useState('');
    const history = useHistory();
    const { socket, error: [error, setError] } = useContext(SocketContext);

    function changeName (evt) {
        setName(evt.target.value);
    }

    function validName () {
        if(name === '') {
            setError('Name cannot be empty')
        }
        return !!error
    }

    function submitName (evt){
        evt.preventDefault();
        setError('')
        if(validName()){
            addToLocalStorage('user', {name, socketId: socket.id});
            if(error) setError('')
            history.push('/rooms')
        }
    }
    
    return (
        <div>
            <form onSubmit={submitName} onChange={changeName}>
                <label>Please enter your name:</label>
                <input type='text' name='name' ></input>
                <button type='submit'>Let's Play</button><br/>
                {error}
            </form>
        </div>
    )
}