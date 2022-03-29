// Game module
const game = () => {

    // Generate players
    // Take in custom name eventually
    const playerOne = playerFactory("Player 1", "X");
    const playerTwo = playerFactory("Player 2", "O");
    
    const start = () => {
        console.log("Game started")

    };

    return { start };
};

// Gameboard module
const gameBoard = (() => {

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
        const tiles = document.querySelectorAll(".tile");

        tiles.forEach((tile) => {
            tile.addEventListener('click', () => {
                tile.textContent = "X";
            })
        })
    }

    const tileClicked = (index) => {
        if (gameBoardArray[index] !== '') {

        }
    }

    const updateBoard = () => {
        console.log(gameBoardArray)
    }

    return {
        gameBoardArray,
        newBoard,
        updateBoard
    }

})();

// Gameboard array

// Player object factory
const playerFactory = (name, choice) => {
    return { name, choice };
}

gameBoard.gameBoardArray[3] = "X";
gameBoard.updateBoard();

gameBoard.newBoard();