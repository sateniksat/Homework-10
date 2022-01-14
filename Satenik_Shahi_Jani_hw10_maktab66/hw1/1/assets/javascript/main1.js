const statusDisplay = document.querySelector(".header__status");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => ` ${currentPlayer}  won!`;
const drawMessage = () => `It's a Draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handletilePlayed(clickedtile, clickedtileIndex) {
  gameState[clickedtileIndex] = currentPlayer;
  if (currentPlayer == "X") {
    document
      .querySelectorAll(".tile")
      [clickedtileIndex].classList.add("fill-x");
  } else {
    document
      .querySelectorAll(".tile")
      [clickedtileIndex].classList.add("fill-o");
  }
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  let combination = [];
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      combination = winningConditions[i];
      break;
    }
  }
  // console.log(combination);
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    let all = document.getElementsByClassName("tile");
    if(currentPlayer=="X"){
      document.querySelector('.status').classList.add('win-x');
    }else{
      document.querySelector('.status').classList.add('win-o');
    }
    for (let i = 0; i < all.length; i++) {
      for (let value of combination) {
        if (value == i) {
          all[i].classList.add("tile--winner");
        }
      }
    }

    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    document.querySelector('.status').classList.add('draw');
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handletileClick(clickedtileEvent) {
  const clickedtile = clickedtileEvent.target;
  const clickedtileIndex = parseInt(clickedtile.getAttribute("data"));

  if (gameState[clickedtileIndex] !== "" || !gameActive) {
    return;
  }

  handletilePlayed(clickedtile, clickedtileIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelector('.status').classList.remove("draw",'win-x',"win-o");
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.innerHTML = "";
    tile.classList.remove("tile--winner","fill-x","fill-o");
  });
}

document
  .querySelectorAll(".tile")
  .forEach((tile) => tile.addEventListener("click", handletileClick));
// document.querySelector('.header__restart').addEventListener('click', handleRestartGame);

var body = document.getElementById("wrapper");
var except = document.getElementById("app");

body.addEventListener(
  "click",
  function () {
    handleRestartGame();
  },
  false
);
except.addEventListener(
  "click",
  function (ev) {
    ev.stopPropagation();
  },
  false
);
