export const shuffle = deck => {
    const shuffledDeck = [];
    while(deck.length) {
        let cardIdx = Math.floor(Math.random() * deck.length);
        shuffledDeck.push(deck[cardIdx]);
        deck.splice(cardIdx, 1)
    }
    return shuffledDeck;
}
