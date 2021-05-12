import React, { useState, useEffect, useContext } from 'react';
import SocketContext from '../context/socket'
import { shuffle } from '../FUNCTIONS'

const Game = (props) => {
    const [deck, setDeck] = useState([
        'Duke',
        'Duke',
        'Duke',
        'Assassin',
        'Assassin',
        'Assassin',
        'Contessa',
        'Contessa',
        'Contessa',
        'Captain',
        'Captain',
        'Captain',
        'Ambassador',
        'Ambassador',
        'Ambassador']);
    const [hand, setHand] = useState([]);

    const socket = useContext(SocketContext)
    socket.on('updateDeck', (deck) => {
        setDeck(deck);
    })

    function dealNewCard () {};

    function updateDeck(shuffledDeck) {
        setDeck(shuffledDeck)
    }

    function startGame() {
        socket.emit('shuffleDeck', shuffle(deck));
    };

    function newGame() {};

    function pickCard(cards) {
        console.log('Card #1:', cards[0], '\nCard #2:', cards[1]);
        return {"picked": 0, "notPicked": 1};
    };

    function exchange(cardInHand) {
        const newCards = [deck[0], deck[1]];
        let result = pickCard(newCards);
        const interval = setInterval(() => {}, 10000);
        clearInterval(interval);
        console.log('result in exchange', result)
        returnCards(result.picked, cardInHand)
    }

    function returnCards(cardPicked, cardToReturn){
        const editedDeck = deck.filter((card, i) => i !== cardPicked)
        editedDeck.push(cardToReturn)
        setDeck(shuffle(editedDeck));
    }

    return (
        <div>
            Hi {deck}
            <button onClick={()=>exchange(deck[0])}>Exchange</button>
            <button onClick={()=>startGame()}>Start Game</button>
        </div>
    )
}

export default Game