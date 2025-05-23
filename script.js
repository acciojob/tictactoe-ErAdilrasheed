//your JS code here. If required.
    const submitBtn = document.getElementById("submit");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const cells = document.querySelectorAll(".cell");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "X";
    let boardState = Array(9).fill("");

    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],  // rows
      [0,3,6], [1,4,7], [2,5,8],  // columns
      [0,4,8], [2,4,6]            // diagonals
    ];

    submitBtn.addEventListener("click", () => {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
      }

      document.getElementById("player-form").style.display = "none";
      board.style.display = "block";

      currentPlayer = player1;
      currentSymbol = "X";
      message.textContent = `${currentPlayer}, you're up!`;
    });

    function checkWinner() {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
          boardState[a] &&
          boardState[a] === boardState[b] &&
          boardState[a] === boardState[c]
        ) {
          return true;
        }
      }
      return false;
    }

    function checkDraw() {
      return boardState.every(cell => cell !== "");
    }

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (boardState[index] !== "") return;

        cell.textContent = currentSymbol.toUpperCase();
        boardState[index] = currentSymbol;

        if (checkWinner()) {
          message.textContent = `${currentPlayer}, congratulations you won!`;
          cells.forEach(c => c.style.pointerEvents = "none");
          return;
        }

        if (checkDraw()) {
          message.textContent = `It's a draw!`;
          return;
        }

        // Switch player
        if (currentPlayer === player1) {
          currentPlayer = player2;
          currentSymbol = "O";
        } else {
          currentPlayer = player1;
          currentSymbol = "X";
        }

        message.textContent = `${currentPlayer}, you're up!`;
      });
    });
