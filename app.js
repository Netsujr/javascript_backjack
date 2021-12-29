// *************** Variables ******************
let blackjackGame = {
  'you': { 'scoreSpan': '#your-score', 'div': '#your-box', 'score': 0 },
  'dealer': { 'scoreSpan': '#dealer-score', 'div': '#dealer-box', 'score': 0 },
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');

// *************** Listeners ******************

document.querySelector('#hit-button').addEventListener('click', Hit);
document.querySelector('#stand-button').addEventListener('click', Stand);
document.querySelector('#deal-button').addEventListener('click', Deal);

// *************** ButtonFunctions ******************

function Hit() {
  // console.log('Hit was Hit');
  let card = randomCard();
  showCard(card, YOU);
  console.log(card);
  updateScore(card, YOU);
  console.log(YOU['score']);
  showScore(YOU);
  // showCard(DEALER);
}

function Stand() {
  // console.log('Stand was Hit');

}

function Deal() {
  // console.log('Deal was Hit');
  let yourImages = document.querySelector('#your-box').querySelectorAll('img');
  let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

  for (image = 0; image < yourImages.length; image++) {
    yourImages[image].remove();
  }

  for (image = 0; image < dealerImages.length; image++) {
    dealerImages[image].remove();
  }
}



// *************** Logic Functions ******************

function showCard(card, activePlayer) {
  let cardImage = document.createElement('img');
  cardImage.src = `images/cards/${card}.png`;
  document.querySelector(activePlayer['div']).appendChild(cardImage);
  hitSound.play();
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
  activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function showScore(activePlayer) {
  document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}
