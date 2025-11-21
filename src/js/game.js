// This file contains the logic related to the board games, including game setup, rules, and interactions.

class BoardGame {
    constructor(name, players, rules) {
        this.name = name;
        this.players = players;
        this.rules = rules;
        this.isActive = false;
    }

    startGame() {
        this.isActive = true;
        console.log(`Starting the game: ${this.name}`);
    }

    endGame() {
        this.isActive = false;
        console.log(`Ending the game: ${this.name}`);
    }

    displayRules() {
        console.log(`Rules for ${this.name}: ${this.rules}`);
    }
}

// Example usage
const chess = new BoardGame('Chess', 2, 'Each player moves their pieces strategically to checkmate the opponent\'s king.');
chess.startGame();
chess.displayRules();