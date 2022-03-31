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

        if (gameBoardArray[index] == '') {

                   
            updateBoard(index, game.whoseTurn.choice)

            console.log(game.whoseTurn);

            game.nextTurn();
            
            console.log(game.whoseTurn);
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
    const playerOne = playerFactory("Player 1", "x");
    const playerTwo = playerFactory("Player 2", "O");

    // Store it on the players instead? Run out of time tonight.
    let whoseTurn = playerOne;

    const newGame = () => {
        gameBoard.newBoard();
        whoseTurn = playerOne;
    }

    const nextTurn = () => {

        // if (whoseTurn == playerOne) {
        //     whoseTurn = playerTwo;
        // } else {
        //     whoseTurn = playerOne;
        // }
    
        // console.log(whoseTurn);
    
        whoseTurn = playerTwo;
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