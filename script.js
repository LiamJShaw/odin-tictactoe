// Player object factory
const playerFactory = (name, choice, turn) => {
    return { name, choice, turn};
};

// Gameboard module
const gameBoard = (() => {

    let tiles;
    const gameBoardArray = ['', '', '',
                            '', '', '',
                            '', '', '',];

    const newBoard = () => {
        // create 9 squares

        const gameBoardUI = document.getElementById("gameBoard");
        gameBoardUI.innerHTML = "";

        for (let i = 0; i < 9; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.classList.add("disable-select");
            tile.textContent = "";
            tile.setAttribute("data-index", i);
            gameBoardUI.append(tile);
        }

        // Add event listeners to tiles
        tiles = document.querySelectorAll(".tile");

        tiles.forEach((tile) => {
            tile.addEventListener('click', (e) => {
                tileClicked(e.target.getAttribute("data-index"));
            })
        })
    }

    const tileClicked = (index) => {

        if (gameBoardArray[index] == '') {    
            updateBoard(index, game.whoseTurn().choice)
            game.nextTurn();
        }
    }

    const updateBoard = (index, char) => {
        
        // Update backend
        gameBoardArray[index] = char;

        // Update UI
        const tile = document.querySelector(`[data-index="${index}"]`);
        tile.textContent = char;
    }

    return {
        newBoard
    }

})();

// Game module
const game = (() => {

    // Generate players
    // Take in custom name eventually
    // Currently sets playerOne's turn to true but will randomise/coin flip eventually
    const playerOne = playerFactory("Player 1", "x", true);
    const playerTwo = playerFactory("Player 2", "O", false);

    const newGame = () => {
        gameBoard.newBoard();
    }

    const whoseTurn = () => {
        if (playerOne.turn === true) {
            return playerOne;
        } else {
            return playerTwo;
        }
    }

    const nextTurn = () => {

        if (playerOne.turn === true) {
            playerOne.turn = false;
            playerTwo.turn = true;
        } else {
            playerOne.turn = true;
            playerTwo.turn = false;
        }
    }
    
    return {
            whoseTurn,
            newGame,
            nextTurn,
            playerOne,
            playerTwo
            };
})();

const newGameButton = document.querySelector(".newGame");

newGameButton.addEventListener("click", () => {
    game.newGame();
    newGameButton.style.display = "none";
})