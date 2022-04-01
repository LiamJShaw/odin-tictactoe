// Display Controller
const displayController = (() => {


    const newGameButton = document.querySelector(".newGame");

    newGameButton.addEventListener("click", () => {
        game.newGame();
        newGameButton.style.display = "none";
    })

    const updateScores = () => {

        const playerOneScoreUI = document.querySelector(".playerOneScore");
        playerOneScoreUI.textContent = game.playerOne.score;

        const playerTwoScoreUI = document.querySelector(".playerTwoScore");
        playerTwoScoreUI.textContent = game.playerTwo.score;
    
    
        playerOneScoreUI.style.display = "block";
        playerTwoScoreUI.style.display = "block";
    }

    const updateResult = () => {
        let resultContainer = document.querySelector(".result");
        resultContainer.textContent = `${game.whoseTurn().name} wins!`;
    }

    return { 
        updateResult,
        updateScores,
    }

})();

// Player object factory
const playerFactory = (name, choice, turn) => {

    let score;

    const updateScore = () => {
        if (turn === true) {
            score = score + 1;
        }
    }

    return { name, choice, turn, score, updateScore};
};

// Gameboard module
const gameBoard = (() => {

    
    let tiles;
    const gameBoardArray = ['', '', '',
                            '', '', '',
                            '', '', '',];

    const newBoard = () => {
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

            const boardState = checkBoardState(index);
            
            if (boardState === "win") {
                game.updateScores();
                displayController.updateResult();
                displayController.updateScores();

            } else if (boardState === "draw") {
                displayController.updateResult("draw");

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

    // TODO: Take in custom name
    // TODO: Currently sets playerOne's turn to true but randomise/coin flip eventually
    
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

    const updateScores = () => {
        playerOne.updateScore();
        playerTwo.updateScore();
    }
    
    return {
            playerOne,
            playerTwo,
            newGame,
            whoseTurn,
            nextTurn,
            updateScores
            };
})();