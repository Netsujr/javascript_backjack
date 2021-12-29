// *************** Variables ******************
let blackjackGame = {
  'you': { 'scoreSpan': '#your-score', 'div': '#your-box', 'score': 0 },
  'dealer': { 'scoreSpan': '#dealer-score', 'div': '#dealer-box', 'score': 0 },
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
  'win': ['bman', 'dk', 'dk2', 'dk3', 'kirby', 'kirby2', 'link', 'marioK'],
  'lose': [],
  'draw': []
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const loseSound = new Audio('sounds/aww.mp3');

// *************** Listeners ******************

document.querySelector('#hit-button').addEventListener('click', Hit);
document.querySelector('#stand-button').addEventListener('click', Stand);
document.querySelector('#deal-button').addEventListener('click', Deal);

// *************** ButtonFunctions ******************

function Hit() {
  let card = randomCard();
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);
  // console.log('Hit was Hit');
  // console.log(card);
  // console.log(YOU['score']);
}

function Stand() {
  // console.log('Stand was Hit');
  dealerLogic();
}

function Deal() {
  showResult(decideWinner());
  // let winner = decideWinner();
  // showResult(winner);
  // ------------------
  let yourImages = document.querySelector('#your-box').querySelectorAll('img');
  let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

  for (image = 0; image < yourImages.length; image++) {
    yourImages[image].remove();
  }

  for (image = 0; image < dealerImages.length; image++) {
    dealerImages[image].remove();
  }

  YOU['score'] = 0;
  DEALER['score'] = 0;

  document.querySelector('#your-score').textContent = 0;
  document.querySelector('#your-score').style.color = 'white';

  document.querySelector('#dealer-score').textContent = 0;
  document.querySelector('#dealer-score').style.color = 'white';

  // /will probably add gif removal here!

}



// *************** Logic Functions ******************

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `images/cards/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
  // ACE logic, 1 or 11
  if (card === 'A') {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function dealerLogic() {
  let card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);
}

function decideWinner() {
  let winner;
  let player = (YOU['score']);
  let dealer = (DEALER['score']);


  if (player <= 21) {

    if (player > dealer || dealer > 21) {
      winner = YOU;
      console.log('you win');

    } else if (player < dealer) {
      winner = DEALER;
      console.log('you lose');

    } else if (player === dealer) {
      console.log('you drew');
    }

  } else if (player > 21 && dealer <= 21) {
    winner = DEALER;
    console.log('you lost');

  } else if (player && dealer > 21) {
    console.log('you both Bust');
  }
  console.log('winner is', winner);
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (winner === YOU) {
    message = `You Won!`;
    messageColor = "green";
    winSound.play();

  } else if (winner === DEALER) {
    message = "You Lost!";
    messageColor = "red";
    loseSound.play();

  } else {
    message = "Its a Draw!";
    messageColor = "orange";
    loseSound.play();
  }

  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}

// ************gifs************

// function randomWinnerGif() {
//   let randomIndex = Math.floor(Math.random() * 8);
//   return blackjackGame['win'][randomIndex];
// }

// let gifImage = document.createElement('img');
// let winGif = randomWinnerGif();
// gifImage.src = `gifs/win/${gif}.gif`;
