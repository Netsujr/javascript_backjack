// *************** Variables ******************
let blackjackGame = {
  'you': { 'scoreSpan': '#your-score', 'div': '#your-box', 'score': 0 },
  'dealer': { 'scoreSpan': '#dealer-score', 'div': '#dealer-box', 'score': 0 },
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'Stand': false,
  'Hit': false,
  // 'win': ['bman', 'dk', 'dk2', 'dk3', 'kirby', 'kirby2', 'link', 'marioK'],
  // 'lose': [],
  // 'draw': []
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
let DRAW;
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const loseSound = new Audio('sounds/aww.mp3');
// *************** Listeners ******************
document.querySelector('#hit-button').addEventListener('click', Hit);
document.querySelector('#stand-button').addEventListener('click', Stand);
document.querySelector('#deal-button').addEventListener('click', Deal);
// *************** ButtonFunctions ******************
firstTwocards();

function firstTwocards() {
  setTimeout(function () {
    Hit();
  }, 700);
  Hit();
}

function Hit() {

  if (blackjackGame['Stand'] === false && YOU["score"] < 21) {

    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  } else {
    dealerLogic(); //making the hit button to call dealerLogic if the player goes bust
  }
  blackjackGame['Hit'] = true;
}


function Stand() {
  // console.log('Stand was Hit');
  resetAce();
  dealerLogic();
  // console.log();
}


function Deal() {
  resetAce();
  if (document.querySelectorAll("span")[0].textContent !== "Let's Play!") {

    if (blackjackGame['turnsOver'] === true) {
      blackjackGame['Stand'] = false;
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
      document.querySelector('#blackjack-result').textContent = "Let's Play!";
      document.querySelector('#blackjack-result').style.color = 'black';
      blackjackGame['turnsOver'] = true;
      // /will probably add gif removal here!
      firstTwocards();
    }
  }
}
//one more hidden input, check how cards, if theres 5 && < 21, ru winning fucntion, for player,



// *************** Logic Functions ******************
function showCard(card, activePlayer) {
  let five = document.getElementById('fiveCards');
  // if (activePlayer['score'] <= 21) {
  let cardImage = document.createElement('img');
  cardImage.src = `images/cards/${card}.png`;
  document.querySelector(activePlayer['div']).appendChild(cardImage);
  hitSound.play();
  five.value++;
  console.log('this is how many cards', five.value);
  // }
}


function randomCard() {
  let randomIndex = Math.floor(Math.random() * 3);
  return blackjackGame['cards'][randomIndex];
}


function updateScore(card, activePlayer) {
  let ace = document.getElementById('ACE');
  let ACE11 = blackjackGame['cardsMap'][card][1];
  // ACE logic, 1 or 11
  if (card === 'A') {
    ace.value++;
    console.log(ace.value);
    activePlayer['score'] += ACE11;

  } else {

    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }

  for (let Subtract10 = 1; Subtract10 <= ace.value; Subtract10++) {

    if (activePlayer['score'] > 21) {
      activePlayer['score'] -= 10;
      ace.value -= 1;
    }

  }
  console.log('These are the current aces', ace.value);
  console.log('activePlayer: ', activePlayer['score']);
}
// else {
//   activePlayer['score'] += blackjackGame['cardsMap'][card];
// }



function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
  resetAce();
  let five = document.getElementById('fiveCards');
  blackjackGame['Stand'] = true;
  if (five.value === 5 && player < 21) {
    decideWinner();
  }

  if (YOU['score'] <= 21) //added logic here
  {
    while ((DEALER['score']) < 16 && blackjackGame['Stand'] === true) {

      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
      await sleep(800);
    }

    blackjackGame['turnsOver'] = true;
    let winner = decideWinner();
    showResult(winner);
  } else { // and here
    blackjackGame['turnsOver'] = true;
    let winner = decideWinner(DEALER);
    showResult(winner);
  }

}

document.querySelector("#your-score").textContent === 'BUST!'

function decideWinner() {
  let winner;
  let five = document.getElementById('fiveCards');
  let player = (YOU['score']);
  let dealer = (DEALER['score']);

  if (five.value === 5 && player < 21) {
    winner = YOU;
    console.log('The CODE reached here!');
  }

  if (player <= 21) {
    if (player > dealer || dealer > 21) {
      // blackjackGame['wins']++;
      winner = YOU;
      // console.log('you win');
    } else if (player < dealer) {
      // blackjackGame['losses']++;
      winner = DEALER;
      // console.log('you lose');
    } else if (player === dealer) {
      // blackjackGame['draws']++;
      // console.log('you drew');
    }
  } else if (player > 21) {
    // blackjackGame['losses']++;
    winner = DEALER;
  }
  // console.log('winner is', winner);
  console.log(blackjackGame);
  return winner;
}



function showResult(winner) {
  let message, messageColor;

  if (blackjackGame['turnsOver'] === true) {

    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = `You Won!`;
      messageColor = "green";
    } else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = "You Lost!";
      messageColor = "red";
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = "Its a Draw!";
      messageColor = "orange";
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}


document.getElementById("blackjack-result").addEventListener("DOMNodeInserted", function (event) {
  console.log("This is the event:", event);
  if (document.querySelector("#blackjack-result").textContent === "You Won!") {
    console.log('Win');
    blackjackGame['wins']++;
    showResult(YOU)
    winSound.play();



  } else if (document.querySelector("#blackjack-result").textContent === "You Lost!") {
    console.log('Lost');
    blackjackGame['losses']++;
    showResult(DEALER);
    loseSound.play();




  } else if (document.querySelector("#blackjack-result").textContent === "Its a Draw!") {
    console.log('Draw');
    blackjackGame['draws']++;
    showResult(DRAW)
  }
}, false);

function resetAce() {
  let ace = document.getElementById('ACE');
  let five = document.getElementById('fiveCards');
  ace.value = 0;
  five.value = 0;
};
