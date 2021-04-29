import React, { useState, useEffect } from 'react';

export const Game = (props) => {
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
        'Ambassador'
    ]);
    const [hand, setHand] = useState([]);

    useEffect(() => {
        setDeck(shuffle(deck));
    },[])

    function dealNewCard () {
        
    };

    function shuffle (deck) {
        const length = deck.length;
        for(let i = 0; i < length; i++){
            let cardIdx = Math.random() * length + i;
            deck.shift(deck[cardIdx]);
            deck.splice(cardIdx, 1)
        }
        return deck;
    }

    function startGame() {};

    function newGame() {};

    function pickCard(cards) {
        console.log('Card #1:', cards[0], '\nCard #2:', cards[1]);
        return {"picked": cards[0], "notPicked": cards[1]};
    };

    function exchange() {
        const tempDeck = new Array(deck);
        const newCards = [tempDeck[0], tempDeck[1]];
        let result;
        const interval = setInterval(() => result = pickCard(newCards), 10000);
        clearInterval(interval);
    }
    
    console.log('DECK:',deck)
    return (
        <div>
            Hi
            {deck}
        </div>
    )
}