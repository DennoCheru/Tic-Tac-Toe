// Gameboard
const Gameboard = (function() {
    const board = Array(9).fill('');
    const getBoard = () => board;

    const setMove = (indexedDB, mark) => {
        if (board[index] === '') {
            board[index] = mark;
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        for(let i=0; i< board.length; i++) {
            board[i] = ';'
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
    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'o';
    const cellElements = document.querySelectorAll(".board-cell");
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let playerX, playerO, currentPlayer;

    const startGame = () => {
        playerX = Player('Player 1', 'x');
        playerO = Player('Player 2', 'O');
        currentPlayer = playerX;
        Gameboard.resetBoard();
        DisplayController.updateBoard();
        DisplayController.setStatusMessage(`${currentPlayer.name}'s turn`);
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