const scoreEl = document.getElementById("score");
let score = localStorage.getItem("score")
  ? parseInt(localStorage.getItem("score"))
  : 0;
scoreEl.textContent = score;

const choices = document.querySelectorAll("#choice-screen .choice");
const choiceScreen = document.getElementById("choice-screen");
const playScreen = document.getElementById("play-screen");
const resultScreen = document.getElementById("result-screen");

const playerPickEl = document.getElementById("player-pick");
const housePickEl = document.getElementById("house-pick");
const finalPlayerEl = document.getElementById("final-player");
const finalHouseEl = document.getElementById("final-house");
const resultText = document.getElementById("result-text");

const playAgainBtn = document.getElementById("play-again");

const rulesBtn = document.getElementById("rules-btn");
const rulesModal = document.getElementById("rules-modal");
const closeModalBtn = document.getElementById("close-modal");

const options = ["rock", "paper", "scissors"];

choices.forEach((btn) => {
  btn.addEventListener("click", () => {
    const playerChoice = btn.dataset.choice;
    showReveal(playerChoice);
  });
});

function showReveal(playerChoice) {
  choiceScreen.classList.remove("active");
  playScreen.classList.add("active");

  playerPickEl.className = `choice ${playerChoice}`;

  housePickEl.className = "choice placeholder";

  setTimeout(() => {
    const houseChoice = options[Math.floor(Math.random() * options.length)];
    housePickEl.className = `choice ${houseChoice}`;
    setTimeout(() => {
      showResult(playerChoice, houseChoice);
    }, 1000);
  }, 1000);
}

function showResult(playerChoice, houseChoice) {
  playScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalPlayerEl.className = `choice ${playerChoice}`;
  finalHouseEl.className = `choice ${houseChoice}`;

  const outcome = getWinner(playerChoice, houseChoice);
  if (outcome === "win") {
    resultText.textContent = "YOU WIN";
    score++;
  } else if (outcome === "lose") {
    resultText.textContent = "YOU LOSE";
    score--;
  } else {
    resultText.textContent = "DRAW";
  }

  scoreEl.textContent = score;
  localStorage.setItem("score", score);
}

function getWinner(p, h) {
  if (p === h) return "draw";
  if (
    (p === "rock" && h === "scissors") ||
    (p === "paper" && h === "rock") ||
    (p === "scissors" && h === "paper")
  )
    return "win";
  return "lose";
}

playAgainBtn.addEventListener("click", () => {
  resultScreen.classList.remove("active");
  choiceScreen.classList.add("active");
});

rulesBtn.addEventListener("click", () => rulesModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () =>
  rulesModal.classList.add("hidden")
);
