// Player object factory
const playerFactory = (name, choice, turn) => {
    return { name, choice, turn};
};

// Gameboard module
const gameBoard = (() => {

    let resultContainer = document.querySelector(".result");
    let tiles;
    const gameBoardArray = ['', '', '',
                            '', '', '',
                            '', '', '',];

    const newBoard = () => {
        const gameBoardUI = document.getElementById("gameBoard");
        gameBoardUI.innerHTML = "";
        resultContainer.textContent = "";


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

            const boardState = checkBoardState(index);
            
            if (boardState === "win") {
                resultContainer.textContent = `${game.whoseTurn().name} wins!`;
            } else if (boardState === "draw") {
                resultContainer.textContent = "Draw!";
            } else {
                game.nextTurn();
            }
        }
    }

    const updateBoard = (index, char) => {
        
        // Update backend
        gameBoardArray[index] = char;

        // Update UI
        const tile = document.querySelector(`[data-index="${index}"]`);
        tile.textContent = char;
    }

    const checkBoardState = (tileChanged) => {

        const winStates = [
            [0,1,2],
            [0,3,6],
            [0,4,8],
            [1,4,7],
            [3,4,5],
            [6,7,8],
            [2,5,8],
            [2,4,6],
        ];


        var startTime = performance.now();

        // Just the states that involve the index that was just changed
        const possibleWinStates = winStates.filter(state => state.includes(parseInt(tileChanged)));

        const results = [];

        possibleWinStates.forEach((state) => {

            if (gameBoardArray[state[0]] && 
                gameBoardArray[state[1]] && 
                gameBoardArray[state[2]]) {

                    if (gameBoardArray[state[0]] === gameBoardArray[state[1]]) {
                        if (gameBoardArray[state[0]] === gameBoardArray[state[2]]) {
                            results.push(true);
                            return;
                        };
                    };

                    results.push(false);
            }            
        })

        var endTime = performance.now()

        console.log(`${endTime - startTime} milliseconds`);


        // Check draw
        if (!(gameBoardArray.includes(''))) {
            if (!(results.includes(true))) {
                return "draw"
            } 
        }

        // Check win
        if (results.includes(true)) {
            return "win";
        }
    }

    return {
        checkBoardState,
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