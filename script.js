document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const message = document.getElementById("message");
  const resetButton = document.getElementById("reset-btn");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  const checkWinner = () => {
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

    for (let condition of winningConditions) {
      const [a, b, c] = condition;

      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        gameActive = false;
        message.textContent = `${currentPlayer} wins!`;
        cells[a].classList.add("winner");
        cells[b].classList.add("winner");
        cells[c].classList.add("winner");
      }
    }

    if (!gameBoard.includes("") && gameActive) {
      message.textContent = "It's a draw!";
      gameActive = false;
    }
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameBoard[index] === "" && gameActive) {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;

      checkWinner();

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  };

  const handleReset = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "";
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("winner");
    });
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  resetButton.addEventListener("click", handleReset);
});
