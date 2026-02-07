let isPlayerOneTurn = true;
let gameOver = false;

const playerTurnInfo = document.getElementById("player-turn-info");
const form = document.getElementById("player-form");
const gameBoard = document.getElementById("game-board");
const gameArea = document.getElementById("game-area");

const playerOneSelections = [];
const playerTwoSelections = [];

const winnerCombination = [
  ['R1-C1','R1-C2','R1-C3'],
  ['R2-C1','R2-C2','R2-C3'],
  ['R3-C1','R3-C2','R3-C3'],
  ['R1-C1','R2-C1','R3-C1'],
  ['R1-C2','R2-C2','R3-C2'],
  ['R1-C3','R2-C3','R3-C3'],
  ['R1-C1','R2-C2','R3-C3'],
  ['R1-C3','R2-C2','R3-C1']
];

form.addEventListener("submit", storePlayerDetails);

function createBoxes(id) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.id = id;
  box.addEventListener("click", playerTurn);
  gameBoard.appendChild(box);
}

let row = 1;
let column = 1;

for (let i = 1; i <= 9; i++) {
  const id = `R${row}-C${column}`;
  createBoxes(id);

  if (i % 3 === 0) {
    row++;
    column = 1;
  } else {
    column++;
  }
}

function playerTurn(e) {
  if (gameOver || e.target.innerText) return;

  e.target.style.backgroundColor = "rgb(238,199,200)";

  if (isPlayerOneTurn) {
    e.target.innerText = "X";
    playerOneSelections.push(e.target.id);
    playerTurnInfo.innerText = `It's ${localStorage.getItem("player2")}'s turn`;
  } else {
    e.target.innerText = "O";
    playerTwoSelections.push(e.target.id);
    playerTurnInfo.innerText = `It's ${localStorage.getItem("player1")}'s turn`;
  }

  isPlayerOneTurn = !isPlayerOneTurn;
  findWinner();
}

function findWinner() {
  for (let combo of winnerCombination) {
    if (combo.every(id => playerOneSelections.includes(id))) {
      playerTurnInfo.innerText = `${localStorage.getItem("player1")} won!`;
      gameOver = true;
      return;
    }
    if (combo.every(id => playerTwoSelections.includes(id))) {
      playerTurnInfo.innerText = `${localStorage.getItem("player2")} won!`;
      gameOver = true;
      return;
    }
  }

  if (playerOneSelections.length + playerTwoSelections.length === 9) {
    playerTurnInfo.innerText = "It's a draw!";
    gameOver = true;
  }
}

function storePlayerDetails(e) {
  e.preventDefault();

  const player1 = document.getElementById("player-1").value;
  const player2 = document.getElementById("player-2").val
