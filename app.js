// *************** Variables ******************
let blackjackGame = {
  'you': { 'scoreSpan': '#your-score', 'div': '#your-box', '#score': 0 },
  'dealer': { 'scoreSpan': '#dealer-score', 'div': '#dealer-box', '#score': 0 }
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');



// *************** Listeners ******************

document.querySelector('#hit-button').addEventListener('click', Hit);
document.querySelector('#stand-button').addEventListener('click', Stand);
document.querySelector('#deal-button').addEventListener('click', Deal);





// *************** Functions ******************

function Hit() {
  // console.log('Hit was Hit');
  showCard(YOU);
}

function showCard(activePlayer) {
  let cardImage = document.createElement('img');
  cardImage.src = 'images/cards/Q.png';
  document.querySelector(activePlayer['div']).appendChild(cardImage);
  hitSound.play();
}



function Stand() {
  // console.log('Stand was Hit');

}

function Deal() {
  // console.log('Deal was Hit');

}
