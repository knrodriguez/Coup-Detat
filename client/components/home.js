import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Home = (props) => {
    const [name, setName] = useState('');
    const history = useHistory();

    function handleChange (evt) {
        setName(evt.target.value);
    }

    function handleSubmit (evt){
        evt.preventDefault();
        localStorage.setItem('name', JSON.stringify(name));
        history.push('/lobby')
    }
    return (
        <div>
            HOMEPAGE
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label>Please enter your name:</label>
                <input type='text' name='name' ></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}