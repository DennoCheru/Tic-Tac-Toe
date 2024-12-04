const X_CLASS = 'x';
const CIRCLE_CLASS = 'o';
const cellElements = document.querySelectorAll(".board-cell");
const board = document.getElementById('board');
const winningMessagetext = document.querySelector('.winning-message-text');
const winningMessage = document.getElementById('winning-message');
const restartBtn = document.querySelector("#restartBtn");
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
let x_turn;

startGame();

function startGame () {
    x_turn = true;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    });
    setBoardHoverClass();
    winningMessage.classList.remove('show');
}

function handleClick(e) {
     const cell = e.target;
     const currentClass = x_turn ? X_CLASS : CIRCLE_CLASS;
     placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        switchPlayer();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchPlayer() {
    x_turn = !x_turn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (x_turn) {
        board.classList.add(X_CLASS)
    } else {
        board.classList.add(CIRCLE_CLASS)
    }
}

function checkWin (currentClass) {
    return winPatterns.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function endGame(draw) {
    if(draw) {
        winningMessagetext.textContent = "Draw"
    } else {
        winningMessagetext.textContent =`${x_turn ? "X's" : "O's"} Wins!`;
    }
    console.log(winningMessagetext);
    console.log(winningMessage)
    winningMessage.classList.add('show');
}

restartBtn.addEventListener('click', startGame);