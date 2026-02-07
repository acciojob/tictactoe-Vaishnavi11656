const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const gameDiv = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1, player2;
let currentPlayer = "x";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (!player1 || !player2) return;

  playerForm.style.display = "none";
  gameDiv.style.display = "block";
  messageDiv.textContent = `${player1}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(cell, index));
});

function handleMove(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    const winnerName = currentPlayer === "x" ? player1 : player2;
    messageDiv.textContent = `${winnerName} congratulations you won!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
  const nextName = currentPlayer === "x" ? player1 : player2;
  messageDiv.textContent = `${nextName}, you're up`;
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
