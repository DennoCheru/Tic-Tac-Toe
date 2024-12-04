// Gameboard
const Gameboard = (function() {
    const board = Array(9).fill('');
    const getBoard = () => board;

    const setMove = (index, mark) => {
        if (board[index] === '') {
            board[index] = mark;
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        for(let i=0; i< board.length; i++) {
            board[i] = ''
        }
    };

    return {
        getBoard,
        setMove,
        resetBoard
    }
})();

// Player Factory
const Player = (name, marker) => {
    return {
        name,
        marker
    };
};
// Game Controller
const GameController = (function() {
    const cellElements = document.querySelectorAll(".board-cell");
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let playerX, playerO, currentPlayer;

    const startGame = () => {
        const player1Name = document.querySelector('#player1-name').value || 'Player 1';
        const player2Name = document.querySelector('#player2-name').value || 'Player 2';
        playerX = Player(player1Name, 'x');
        playerO = Player(player2Name, 'o');
        currentPlayer = playerX;
        Gameboard.resetBoard();
        DisplayController.updateBoard();
        DisplayController.setStatusMessage(`${currentPlayer.name}'s turn`);
        cellElements.forEach(cell => cell.classList.remove('x', 'o'));
        setBoardHoverClass();
    };

    const handleClick = (index) => {
        if (Gameboard.setMove(index, currentPlayer.marker)) {
            DisplayController.updateBoard();
            if (checkWin(currentPlayer.marker)) {
                DisplayController.endGame(`${currentPlayer.name} wins!`);
            } else if (isDraw()) {
                DisplayController.endGame('Draw!');
            } else {
                switchPlayer();
                DisplayController.setStatusMessage(`${currentPlayer.name}'s turn`);
                setBoardHoverClass();
            }
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const checkWin = (mark) => {
        const board = Gameboard.getBoard();
        return winPatterns.some(pattern => {
            return pattern.every(index => board[index] === mark);
        });
    };

    const isDraw = () => {
        const board = Gameboard.getBoard();
        return board.every(cell => cell !== '');
    };

    const setBoardHoverClass = () => {
        const boardElement = document.querySelector('#board');
        boardElement.classList.remove('x');
        boardElement.classList.remove('o');
        if (currentPlayer.marker === 'x') {
            boardElement.classList.add('x');
        } else {
            boardElement.classList.add('o');
        }
    };

    return {
        startGame,
        handleClick
    };
})();

// DisplayController
const DisplayController = (function() {
    const cellElements = document.querySelectorAll('.board-cell');
    const winningMessageElement = document.querySelector('.winning-message');
    const winningMessageTextElement = document.querySelector('.winning-message-text');
    const restartButton = document.querySelector('#restartBtn');
    const startButton = document.querySelector('#start-button');

    const updateBoard = () => {
        const board = Gameboard.getBoard();
        cellElements.forEach((cell, index) => {
            cell.classList.remove('x');
            cell.classList.remove('o');
            if (board[index]) {
                cell.classList.add(board[index]);
            }
        });
    };

    const setStatusMessage = (message) => {
        const statusElement = document.querySelector('#status');
        statusElement.textContent = message;
    };

    const endGame = (message) => {
        winningMessageTextElement.textContent = message;
        winningMessageElement.classList.add('show');
    };

    const addClickListeners = () => {
        cellElements.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
                    GameController.handleClick(index);
                }
            });
        });
    
        restartButton.addEventListener('click', () => {
            winningMessageElement.classList.remove('show');
            GameController.startGame();
        });

        startButton.addEventListener('click', () => {
            winningMessageElement.classList.remove('show');
            const player1Name = document.querySelector('#player1-Name').value;
            const player2Name = document.querySelector('player2-Name').value;
            GameController.startGame(player1Name, player2Name);
        })
    };

    return {
        updateBoard,
        setStatusMessage,
        endGame,
        addClickListeners
    }
})();

GameController.startGame();
DisplayController.addClickListeners();