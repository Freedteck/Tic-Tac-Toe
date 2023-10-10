const gameBoard = (function () {
    const gameBoardChild = ['', '', '', '', '', '', '', '', '']
    const value = ['X', 'O']

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [2, 4, 6], [0, 4, 8]
    ]

    const winning = () => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo
            if (gameBoardChild[a] && gameBoardChild[a] === gameBoardChild[b]
                && gameBoardChild[a] === gameBoardChild[c]) {
                return gameBoardChild[a]
            }
        }
        return null
    }
    return { value, gameBoardChild, winning }
})()

const boards = document.querySelectorAll('.board')
const main = document.querySelector('main')
const dialog = document.querySelector('.dialog')
const startBtn = document.getElementById('start')

startBtn.addEventListener('click', () => {
    main.classList.add('show')
    dialog.classList.add('hide')
})

let player = 0

boards.forEach((board, index) => {
    board.addEventListener('click', () => {
        if (!board.textContent) {
            const choice = gameBoard.value[player]
            board.textContent = choice

            gameBoard.gameBoardChild[index] = choice
        }
        console.log(gameBoard.gameBoardChild);
        const winner = gameBoard.winning()
        if (winner) {
            alert(`Player ${winner} wins`)
        } else {
            player = (player + 1) % 2
        }
    })
})