const board = document.querySelector('.board');
const gameStatus = document.querySelector('.gameStatus');
const newGameBtn = document.querySelector('.newGame')

const game = (function (board, gameStatus, newGameBtn) {
    const squares = new Array(9);
    const Player1 = 'X';
    const Player2 = 'O';
    let currentPlayer = Player1;

    newGame();
    newGameBtn.addEventListener('click', newGame)

    function gameEnd() {
        return win(Player1) || win(Player2) || drawGame()
    }

    function makeMove(player, index) {
        squares[index] = player;
        currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
        renderPage();
    }

    function win(player) {
        const winningLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
        ]
        return winningLines.some((positions) => positions.every((pos) => squares[pos] === player))
    }

    function drawGame() {
        return squares.every((e) => e === Player1 || e === Player2)
    }

    function newGame() {
        squares.fill('');
        currentPlayer = Player1;
        console.log(board);
        board.addEventListener('click', clickSquare)
        renderPage();
    }

    function gameInfo() {
        if (win(Player1)) return 'Player1 wins!'
        if (win(Player2)) return 'Player2 wins!'
        if (drawGame()) return 'Draw game.'
        return `${currentPlayer === Player1 ? 'Player1' : 'Player2'}'s turn`
    }

    function renderPage() {
        board.innerHTML = squares.map((e, index) => `<button class='square' data-index=${index}>${e}</button>`).join('')
        gameStatus.innerText = gameInfo();
        if (gameEnd())
            board.removeEventListener('click', clickSquare);
    }

    function clickSquare(event) {
        const square = event.target;
        console.log(square.dataset.index)
        if(square.classList.contains('square')) {
            const index = square.dataset.index;
            if(squares[index] === '') {
                console.log(currentPlayer)
                makeMove(currentPlayer, index)
            }
        }

    }
})(board, gameStatus, newGameBtn);
