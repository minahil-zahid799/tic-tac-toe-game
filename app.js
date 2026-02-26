let board = document.getElementById("board");
let statusText = document.getElementById("status");
let resetBtn = document.getElementById("reset");

let cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let gameOver = false;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Add base styling to cells dynamically
cells.forEach(cell => {
  cell.className =
    "cell border border-[#1f2937] flex items-center justify-center text-5xl font-extrabold rounded-xl cursor-pointer hover:bg-gray-200 hover:text-black transition duration-200 aspect-square orbitron";
});

// Click Logic
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {

    if (cell.textContent !== "" || gameOver) return;

    cell.textContent = currentPlayer;

    let winner = checkWinner();

    if (winner) {
      statusText.textContent = `Player ${winner} Won! 🎉`;
      gameOver = true;
      removeHover();
      return;
    }

    if (checkDraw()) {
      statusText.textContent = "It's a Draw!";
      gameOver = true;
      cells.forEach(cell => cell.classList.add("bg-yellow-400"));
      removeHover();
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;

  });
});

// Winner Function
function checkWinner() {
  for (let combo of winningCombos) {

    let [a,b,c] = combo;

    if (
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent &&
      cells[a].textContent !== ""
    ) {
      cells[a].classList.add("bg-green-400");
      cells[b].classList.add("bg-green-400");
      cells[c].classList.add("bg-green-400");

      return cells[a].textContent;
    }
  }
  return null;
}

// Draw Check
function checkDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

// Remove hover after game ends
function removeHover() {
  cells.forEach(cell => {
    cell.classList.remove("hover:bg-gray-200");
    cell.classList.remove("cursor-pointer");
  });
}

// Reset Button
resetBtn.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("bg-green-400", "bg-yellow-400");
    cell.classList.add("hover:bg-gray-200", "cursor-pointer");
  });

  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X Turn";
});