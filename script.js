// Game module
const game = (() => {

    // Generate players
    // Take in custom name eventually
    const playerOne = {name: "Player 1", choice: "X"};
    const playerTwo = {name: "Player 2", choice: "O"};

    let whoseTurn = playerOne;

    // const nextTurn = () => {
    //     if (whoseTurn === playerOne) {
    //         whoseTurn = playerTwo;
    //     } else {
    //         whoseTurn = playerOne;
    //     }
    // }
    
    const start = () => {
        console.log("Game started")

    };

    return { start,
            whoseTurn,
            // nextTurn,
            playerOne,
            playerTwo
            };
})();

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
            tile.addEventListener('click', (e) => {
                tileClicked(e.target.getAttribute("data-index"));
            })
        })
    }

    const tileClicked = (index) => {

        console.log(game.whoseTurn.choice)

        // if (gameBoardArray[index] !== '') {
            
            if (game.whoseTurn == game.playerOne) {
                gameBoardArray[index] = game.playerOne.choice;
                console.log("Player 1 played");
                game.whoseTurn = game.playerTwo;
            } else {
                console.log("Player 2 played");
                game.whoseTurn = game.playerOne;
            }
            
        // }
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
const playerFactory = ((name, choice) => {
    return { name, choice };
})();

gameBoard.gameBoardArray[3] = "X";
gameBoard.updateBoard();

gameBoard.newBoard();