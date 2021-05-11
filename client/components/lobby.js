import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getFromLocalStorage, addToLocalStorage } from '../FUNCTIONS'
const ALPHABET_START = 65;
const ALPHABET_END = 122;
const ALPHABET = ALPHABET_END - ALPHABET_START;
const INVALID_CHARS_START = 91;
const INVALID_CHARS_END = 96;

export const Lobby = (props) => {
    const user = localStorage.getItem('name');
    const rooms = JSON.parse(localStorage.getItem('rooms'));
    const history = useHistory();
    const [showCreateGameModal, setShowCreateGameModal] = useState(false)
    const [showJoinGameModal, setShowJoinGameModal] = useState(false)
    
    if(!user) history.push('/')

    function handleSubmit(){

    }

    function rng(start, end, invalidStart = null, invalidEnd = null){
        let randomNum = Math.floor(Math.random() * (end - start) + start);
        if(randomNum >= invalidStart && randomNum <= invalidEnd) 
            return rng();
        return randomNum;
    }

    function createUrl(){
        let url = '';
        for(let i = 0; i < 16; i++){
            url += String.fromCharCode(rng(ALPHABET_START, ALPHABET_END, INVALID_CHARS_START, INVALID_CHARS_END))
        }
        return url;
    }

    function createGameCode(){
        let code = ''; 
        while(code.length < 4){
            code += String.fromCharCode(rng(65, 90))
        }
        // const gameCodes = getFromLocalStorage('gameCodes');
        // if(!gameCodes.includes(code)) addToLocalStorage('gameCodes', [...gameCodes, code]);
        return code;
    }

    const createGameModal = (
        <div>
            Here is your game code! Share with your friends to start a Coup!
            {createGameCode()}

            <Link to={`games/${createUrl()}`}>Start Game!</Link>
            {/* onClick, make button -> emit url to other players, trigger start game sequence, destroy code*/}
        </div>
    )

    const joinGameModal = (
        <div>
            Waiting for the host to start the game!
            {/**/}
        </div>
    )

    //combine these to create reusable modal component
    if(showCreateGameModal) return createGameModal;
    if(showJoinGameModal) return joinGameModal;

    return(
        <div>
            <button type='button' onClick={()=>setShowCreateGameModal(true)}>Create A Game</button>
            <h2>or</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter A Game Code:</label>
                <input type='text'></input>
                <button type='submit'>Join Game</button>
            </form>
        </div>
    )
}