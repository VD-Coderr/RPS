// ------------- UI
const userScoreHTML = document.querySelector('#userScore');
const computerScoreHTML = document.querySelector("#computerScore");
const userGameWinsHTML = document.querySelector('#userGameWins');
const computerGameWinsHTML = document.querySelector('#computerGameWins');

const roundResult = document.querySelector('.roundResult');
const controls = document.querySelectorAll('.choiceBtn');

let userMove;
let computerMove;

// makes first letter of string upper case
function toUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ------------- Game logic
let userScore = 0;
let computerScore = 0;
let userGameWins = 0;
let computerGameWins = 0;

// register user input, update computer random move and fire up a game
controls.forEach((button) => {
  button.addEventListener('click', () => {
    userMove = button.dataset.move;
    game();
  });
});

// gets random move and assign it to computer move
function getRandomMove() {
  let randomNumber = Math.round(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      computerMove = 'rock';
      break;
    case 1:
      computerMove = 'paper';
      break;
    case 2:
      computerMove = 'scissors';
      break;
  }
}

// evalutes a winner of one round, displays message and add score
function playRound(userMove, computerMove) {
  if ((userMove == 'rock' && computerMove == 'scissors') || 
      (userMove == 'paper' && computerMove == 'rock') || 
      (userMove == 'scissors' && computerMove == 'paper')) {
    roundResult.innerText = `You won! \n${toUpper(userMove)} beats ${computerMove}`;
    userScore ++;
    userScoreHTML.textContent = userScore;
  } else if ((computerMove == 'rock' && userMove == 'scissors') || 
             (computerMove == 'paper' && userMove == 'rock') || 
             (computerMove == 'scissors' && userMove == 'paper')) {
    roundResult.innerText = `You lost! \n ${toUpper(computerMove)} beats ${userMove}`;
    computerScore ++;
    computerScoreHTML.textContent = computerScore;
  } else if (userMove == computerMove && userMove != undefined && computerMove != undefined) {
    roundResult.innerText = `Draw! \nBoth chose ${userMove}`;
  } else {
    roundResult.textContent = "Make your move!";
    userScoreHTML.textContent = userScore;
    computerScoreHTML.textContent = computerScore;
  }
}

// reset roundScore before new Game (after somebody won)
function reset() {
  userScore = 0;
  computerScore = 0;
  userMove = undefined;
  computerMove = undefined;
  playRound(userMove, computerMove);
}

// reset everything. Assigned to reset button.
function resetAll() {
  userScore = 0;
  computerScore = 0;
  userMove = undefined;
  computerMove = undefined;
  userGameWins = 0;
  computerGameWins = 0;
  userGameWinsHTML.textContent = userGameWins;
  computerGameWinsHTML.textContent = computerGameWins;
  playRound(userMove, computerMove);
}

// evaluates if 1 game is played (5 rounds) and returns the winner / undefined if false 
function isGameOver() {
  let isDone =  userScore + computerScore >= 5;
  let userWin = userScore > computerScore;
  if (isDone && userWin) {
    return 'user';
  } else if (isDone && !userWin) {
    return "computer";
  }
}

// game steps: 
function game() {
  getRandomMove();
  playRound(userMove, computerMove);
  if (isGameOver() == 'user') {
    userGameWins ++;
    userGameWinsHTML.textContent = userGameWins;
    reset();
  } else if (isGameOver() == 'computer') {
    computerGameWins ++;
    computerGameWinsHTML.textContent = computerGameWins;
    reset();
  }
}