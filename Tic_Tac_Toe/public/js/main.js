const X_CLASS = "x";
const O_CLASS = "o";

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
const winnerMessageElement = document.getElementById("winnerMessage");
const winnerMessageTextElement = document.querySelector("[data-winner-message-text]");
const restartButton = document.querySelector(".restartButton");

let oTurn;

// Start the game
startTheGame();

// Restart button functionality
restartButton.addEventListener("click", startTheGame);

// Function to start or restart the game
function startTheGame() {
    oTurn = false;
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerText = "";
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });

    setBoardHoverClass();
    winnerMessageElement.style.display = "none";
}

// Handle each cell click
function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

// Add X or O class and show mark
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass.toUpperCase(); // Display X or O
    console.log(`Placing Mark ${currentClass.toUpperCase()} on cell`);
}

// Swap turns between X and O
function swapTurns() {
    oTurn = !oTurn;
}

// Change board hover class based on turn
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(oTurn ? O_CLASS : X_CLASS);
}

// Check for a draw
function isDraw() {
    return [...cellElements].every((cell) => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

// Display winner or draw message
function endGame(draw) {
    if (draw) {
        winnerMessageTextElement.innerText = "Draw!";
    } else {
        winnerMessageTextElement.innerText = `${oTurn ? "O" : "X"} Wins!`;
    }
    winnerMessageElement.style.display = "flex"; // Or "block" depending on your CSS
}

// Check for winning combinations
function checkWin(currentClass) {
    const hasWon = WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });

    console.log(`Checking win for ${currentClass} : ${hasWon}`);
    return hasWon;
}
