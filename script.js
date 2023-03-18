class Card {
  constructor(suit,rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.val = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
  }

  createDeck() {
    let suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
    let ranks = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], j + 1));
      }
    }
    this.shuffle();
  }

  shuffle() {
    this.cards = this.cards.sort((a, b) => 0.5 - Math.random());
  }
}

// let deck = new Deck();
// console.log(deck);

class GameOfWar {
  constructor() {
    this.p1 = [];
    this.p2 = [];
    this.pile = [];
    this.setUpGame();
  }

  setUpGame() {
    // Create a new deck
    let deck = new Deck();

    this.p1 = deck.cards.splice(0, 26);
    this.p2 = deck.cards;
  }

  playGame() {
    // Our playGame function starts the game
    // Set up game logic loop ( until a player has no more cards)

    while (this.p1.length !== 0 && this.p2.length !== 0) {
      let p1Card = this.p1.pop(); // {suit, rank, value}
      let p2Card = this.p2.pop(); // {suit, rank, value}

      if (p1Card.val < p2Card.val) {
        //if player1 card value is less than player2 card value, then player2 wins and take both cards and add those 2 cards to the bottom of player2 deck.
        this.p2.unshift(p1Card, p2Card, ...this.pile);
        console.log(`Player2 has ${p2Card.rank} of ${p2Card.suit} worth ${p2Card.val} points. Player1 has ${p1Card.rank} of ${p1Card.suit} worth ${p1Card.val} points
      and Player2 has won the round. Player2 has a total of ${this.p2.length} cards. Player1 has a total of ${this.p1.length} cards`);

        // clear the pile
        this.pile = [];
      } else if (p1Card.val > p2Card.val) {
        //if player1 card value is greater than player2 card value, then player1 wins and take both cards and add those 2 cards to the bottom of player1 deck.
        this.p1.unshift(p2Card, p1Card, ...this.pile);
        console.log(`Player1 has ${p1Card.rank} of ${p1Card.suit} worth ${p1Card.val} points.Player2 has ${p2Card.rank} of ${p2Card.suit} worth ${p2Card.val} points.
       and Player1 has won the round. Player1 has a total of ${this.p1.length} cards. Player2 has a total of ${this.p2.length} cards `);

        // clear the pile
        this.pile = [];
      } else {
        //War
        console.log("It's war time!");
        this.pile.push(p1Card, p2Card)
        this.war();
      }
    }

    // Winners message
    if (this.p1.length === 0) {
      console.log("Player 2 has won the game of war.")
    } else {
      console.log("Player 1 has won the game of war.")
    }
  }

  war() {
    // Adjust for edge cases (a player does not have enough cards)
    if (this.p1.length <= 3) {
      // player 2 wins
      this.pile.push(...this.p1);
      this.p1.length = 0;
    } else if (this.p2.length <= 3) {
      // player 1 wins
      this.pile.push(...this.p2);
      this.p2.length = 0;
    } else {
      this.pile.push(...this.p1.splice(0, 3));
      this.pile.push(...this.p2.splice(0, 3));
    }
  }
}

let game = new GameOfWar();
console.log(game);
game.playGame();
