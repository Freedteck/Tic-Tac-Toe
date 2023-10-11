// Variables
const boardElements = document.querySelectorAll('.board');
const main = document.querySelector('main');
const dialog = document.querySelector('.dialog');
const startBtn = document.getElementById('start');
const sideBar = document.querySelector('.sidebar');
const resetBtn = document.getElementById('reset');
const popUp = document.getElementById('pop-up')
const continueBtn = document.getElementById('continue')
const span = document.querySelector('span')
const closeBtn = document.querySelector('.close')

const player1Score = document.getElementById('score1');
const player2Score = document.getElementById('score2');
let moves = 0

// Game Board Module
const gameBoard = (function () {
    const board = ['', '', '', '', '', '', '', '', ''];
    const players = ['X', 'O'];

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [2, 4, 6], [0, 4, 8]
    ];

    const checkWinner = () => {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const clearBoard = () => {
        boardElements.forEach(boardElement => {
            boardElement.textContent = '';
            board.splice(0);
            moves = 0
        });
    }

    return { players, board, checkWinner, clearBoard };
})();

// Player Factory Functions
const Player = function (name, symbol) {
    let score = 0;
    const increaseScore = () => score++;
    const getScore = () => score;
    const resetScore = () => score = 0

    return { name, symbol, increaseScore, getScore, resetScore };
};

// Game Module
const game = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    const startGame = (boardElement, index) => {
       
            const choice = currentPlayer.symbol;
            boardElement.textContent = choice;
            moves++
            gameBoard.board[index] = choice;
        
    }
    
    const displayWinner = () => {
        const winner = gameBoard.checkWinner();
        if (winner) {
            span.textContent = winner
            popUp.showModal()
        } else if (moves === 9 && !winner) {
            alert(`It's a tie!! click Ok to continue`)          
            gameBoard.clearBoard()
        }
        
        currentPlayer = currentPlayer === player1 ? player2 : player1;

        if (winner === 'X') {
            player1.increaseScore()
            player1Score.textContent = player1.getScore();
        } else if (winner === 'O') {
            player2.increaseScore()
            player2Score.textContent = player2.getScore();
        }

    }

    const resetGame = () => {
        gameBoard.clearBoard()
        player1.resetScore()
        player2.resetScore()

        player1Score.textContent = player1.getScore();
        player2Score.textContent = player2.getScore();
    }

    return { startGame, displayWinner, resetGame }
})()

// Event Listeners
startBtn.addEventListener('click', () => {
    main.classList.add('show');
    dialog.classList.add('hide');
    sideBar.classList.add('show');
});

resetBtn.addEventListener('click', () => {
    game.resetGame()
})

continueBtn.addEventListener('click', () => {
    popUp.close()
    gameBoard.clearBoard();
})

closeBtn.addEventListener('click', () => {
    popUp.close()
    game.resetGame()
    main.classList.remove('show')
    sideBar.classList.remove('show')
    dialog.classList.remove('hide')
})

boardElements.forEach((boardElement, index) => {
    boardElement.addEventListener('click', () => {
        if (!gameBoard.board[index]) {
            game.startGame(boardElement, index)
            game.displayWinner()
        }
    });
});
