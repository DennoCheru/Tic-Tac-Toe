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