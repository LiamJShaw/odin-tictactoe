// Display Controller
const displayController = (() => {

    const newGameButton = document.querySelector(".newGame");

    newGameButton.addEventListener("click", () => {

        game.newGame();
        newGameButton.style.display = "none";
    })

    const updateScores = () => {
        
        const playerOneScoreUI = document.querySelector(".playerOneScore");
        playerOneScoreUI.textContent = game.playerOne.getScore()

        const playerTwoScoreUI = document.querySelector(".playerTwoScore");
        playerTwoScoreUI.textContent = game.playerTwo.getScore()
    
        playerOneScoreUI.style.display = "block";
        playerTwoScoreUI.style.display = "block";
    }

    const updateResult = (result) => {
        let resultContainer = document.querySelector(".result");

        switch (result) {
            case "draw":
                resultContainer.textContent = "Draw!";
                break;

            case "win":
                resultContainer.textContent = `${game.whoseTurn().getName()} wins!`;
                break;   

            case "clear":
                resultContainer.textContent = "";
                break;
        }

        newGameButton.style.display = "block";
        
    }

    return { 
        updateResult,
        updateScores
    }

})();

// Player object factory
const playerFactory = (name, choice, turn, score = 0) => {

    const updateScore = () => {
        score = score + 1;
    }

    const getScore = () => {
        return score;
    }

    const updateName = (newName) => {
        name = newName;
    }

    const getName = () => {
        return name;
    }

    return {choice, turn, getScore, updateScore, updateName, getName};
};

// Gameboard module
const gameBoard = (() => {

    let tiles;
    let gameBoardArray;

    const newBoard = () => {

        gameBoardArray = ['', '', '',
                          '', '', '',
                          '', '', '',];

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

    // I seem to be unable to remove event listeners without a named callback, so a hack for now
    const stopTileClicks = () => {
        for (let i = 0; i < 9; i++) {
            if (gameBoardArray[i] === '') {
                gameBoardArray[i] = 'gameEnded'
            }
        }
    }

    const tileClicked = (index) => {

        if (gameBoardArray[index] == '') {    
            updateBoard(index, game.whoseTurn().choice)

            const boardState = checkBoardState(index);
            
            if (boardState === "win") {
                game.updateScores();
                displayController.updateResult("win");
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

        // Check draw
        if (!(gameBoardArray.includes(''))) {
            if (!(results.includes(true))) {
                stopTileClicks();
                return "draw"
            } 
        }

        // Check win
        if (results.includes(true)) {
            stopTileClicks();
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
    // TODO: Currently sets playerOne's turn to true but randomise/coin flip eventually

    const playerOne = playerFactory("Player 1", "X", true);
    const playerTwo = playerFactory("Player 2", "O", false);

    const newGame = () => {

        const playerOneNameInput = document.querySelector(".playerOneName");
        const playerTwoNameInput = document.querySelector(".playerTwoName");
    
        if (!(playerOneNameInput.value == "")) { 
            playerOne.updateName(playerOneNameInput.value);
        }
    
        if (!(playerTwoNameInput.value == "")) { 
            playerTwo.updateName(playerTwoNameInput.value);
        }
    
        
        displayController.updateResult("clear");
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
        whoseTurn().updateScore();
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