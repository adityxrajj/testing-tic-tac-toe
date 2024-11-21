const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }
  return boardState.includes(null) ? null : 'Draw';
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!boardState[index]) {
    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    const result = checkWinner();
    if (result) {
      statusText.textContent =
        result === 'Draw' ? "It's a Draw!" : `${currentPlayer} Wins!`;
      cells.forEach((cell) => cell.classList.add('taken'));
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  boardState.fill(null);
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  statusText.textContent = "X's Turn";
}

cells.forEach((cell) => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
