import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export const Lobby = (props) => {
    const user = localStorage.getItem('name');
    const rooms = JSON.parse(localStorage.getItem('rooms'));
    const history = useHistory();
    
    if(!user) history.push('/')

    return(
        <div>
            LOBBY
            <Link to='/create-room'>Create A Room</Link>
            <br/>
            {
                rooms.map((room, idx) => (
                    <>
                        <Link to={`/games/${idx}`}>{room}</Link>
                        <br/>
                    </>
                ))
            }
        </div>
    )
}