// Player object factory
const playerFactory = (name, choice) => {
    return { name, choice };
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

        // if (gameBoardArray[index] !== '') {
            
            updateBoard(index, game.whoseTurn)
            game.nextTurn();
            
        // }
    }

    const updateBoard = (index, player) => {
        
        // Update backend
        gameBoardArray[index] = player.choice;

        // Update UI
        const tile = document.querySelector(`[data-index="${index}"]`);
        tile.textContent = player.choice;
    }

    return {
        newBoard
    }

})();

// Game module
const game = (() => {

    // Generate players
    // Take in custom name eventually
    const playerOne = playerFactory("Player 1", "x");
    const playerTwo = playerFactory("Player 2", "O");

    let whoseTurn = playerOne;

    const nextTurn = () => {

        console.log(whoseTurn);

        if (whoseTurn == playerTwo) {
            whoseTurn = playerOne ;
        } else {
            whoseTurn = playerTwo;
        }

        whoseTurn = playerTwo;
    }
    
    const start = () => {
        console.log("Game started")

    };

    return { start,
            whoseTurn,
            nextTurn,
            playerOne,
            playerTwo
            };
})();

gameBoard.newBoard();