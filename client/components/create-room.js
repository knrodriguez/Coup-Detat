import React, {useState} from 'react';

export const CreateRoom = (props) => {
    const [roomName, setRoomName] = useState('');

    function handleChange(evt){
        setRoomName(evt.target.value)
    }
    
    function handleSubmit(evt){
        evt.preventDefault();
        const rooms = JSON.parse(localStorage.getItem('rooms'));
        localStorage.setItem('rooms', JSON.stringify([...rooms, roomName]))
        history.push('/lobby')
    }

    return (
        <div>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label>Room Name:</label>
                <input type='text' name='roomName'></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
