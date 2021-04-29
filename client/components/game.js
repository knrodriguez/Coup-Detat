import React, { useState, useEffect } from 'react';

export const Game = (props) => {
    const [deck, setDeck] = useState([]);
    const [hand, setHand] = useState([]);

    useEffect(() => {
        const shuffledDeck = shuffle([
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
            'Ambassador'])
        setDeck(shuffledDeck);
    },[])

    // useEffect(() => {
    //     exchange();
    // },[deck])

    function dealNewCard () {
        
    };

    function shuffle (deck) {
        const shuffledDeck = [];
        while(deck.length) {
            let cardIdx = Math.floor(Math.random() * deck.length);
            shuffledDeck.push(deck[cardIdx]);
            deck.splice(cardIdx, 1)
        }
        console.log('shuffled deck', shuffledDeck)
        return shuffledDeck;
    }

    function startGame() {};

    function newGame() {};

    function pickCard(cards) {
        console.log('Card #1:', cards[0], '\nCard #2:', cards[1]);
        return {"picked": cards[0], "notPicked": cards[1]};
    };

    function exchange(cardInHand) {
        const newCards = [deck[0], deck[1]];
        let result = pickCard(newCards);
        const interval = setInterval(() => {}, 10000);
        clearInterval(interval);
        console.log('result in exchange', result)
        returnCards([result.notPicked, cardInHand])
    }

    function returnCards(cards){
        setDeck(shuffle([...deck, ...cards]));
    }

    return (
        <div>
            Hi {deck}
            <button onClick={()=>exchange(deck[0])}>Exchange</button>
        </div>
    )
}