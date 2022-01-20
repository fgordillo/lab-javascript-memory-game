class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    // add the rest of the class properties here
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    // ... write your code here
    if (!this.cards) return
    this.cards = this.cards.map(card => {
      return {
        ...card,
        id: Math.random()
      }
    })
    .sort((a, b) => a.id - b.id)
    .map(card => {
      return {
        name: card.name,
        img: card.img
      }
    })
  }

  checkIfPair(card1, card2) {
    // ... write your code here
    this.pairsClicked++;
    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    }
    return false;
  }

  checkIfFinished() {
    // ... write your code here
    return this.pairsGuessed >= Math.floor(this.cards.length / 2)
  }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = MemoryGame;
