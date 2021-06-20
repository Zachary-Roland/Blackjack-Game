// import moment from 'moment';
const suit = ["spades", "hearts", "diamonds", "clubs"];
const face = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const playerHand = new Array();
const compHand = new Array();
let deck = new Array();
let playerPoints = 0;
let compPoints = 0;
let gameResult;
let errMsg;
const ageButton = document.getElementById("oldButton");
const notOldButton = document.getElementById("notOldButton")
const birthdayInput = document.getElementById("birthday")
notOldButton.addEventListener("click", function redirect(){
    window.location=`https://www.sesamestreet.org/`
})
ageButton.addEventListener("click", function verifyAge() {
    let birthday = birthdayInput.value
    birthday = new Date(birthday);
    var today = new Date();
    var age = Math.floor((today-birthday) / (365.25 * 24 * 60 * 60 * 1000));
    // if under 18, add div with text errMsg and redirect to sesame street after a couple seconds.
    let ageQ = document.getElementById("ageQ")
    let agePrompt = document.getElementById("agePrompt")
    if (isNaN(age)) {
        agePrompt.innerText = "Please enter a valid date!"
    }
    if (age < 18) {
        ageQ.innerText = "You're not old enough!"
        agePrompt.innerText = "Let's take you somewhere more age appropriate..."
        setTimeout(function(){ 
            window.location=`https://www.sesamestreet.org/`
         }, 2000);
        console.log(errMsg);
    } else if (age > 18) {
        let removeTarget = document.getElementById("verifyAgeDiv");
        removeTarget.classList.add("removed");
        removeTarget.addEventListener("transitionend", ()=> {
            removeTarget.remove();
        })
    }
})
function getDeck() {
  suit.forEach((i) => {
    face.forEach((j) => {
      let card = { face: j, suit: i };
      if (card.face === "ace") {
        card.value = 11;
      } else if (
        card.face === "jack" ||
        card.face === "queen" ||
        card.face === "king"
      ) {
        card.value = 10;
      } else {
        card.value = parseInt(j);
      }
      deck.push(card);
    });
  });
}
function shuffle(array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
function deal() {
  playerHand.push(shuffledeck.pop());
  compHand.push(shuffledeck.pop());
  playerHand.push(shuffledeck.pop());
  compHand.push(shuffledeck.pop());
  showPlayer();
  showComp();
}
function playerEval() {
  playerPoints = 0;
  compPoints = 0;
  playerHand.forEach((card) => {
    playerPoints += card.value;
  });
  compHand.forEach((card) => {
    compPoints += card.value;
  });
  if (playerPoints === 21 && compPoints === 21) {
    gameResult = "tie"
    console.log(`It's a tie! What are the odds??`);
  } else if (playerPoints === 21) {
    gameResult = "win"
    console.log(`Player wins!`);
  } else if (compPoints === 21) {
    gameResult = "lose"
    console.log(`Computer wins!`);
  } else if (playerPoints > 21) {
    gameResult = "lose"
    console.log(`Busted! Better luck next time!`);
  } else {
    console.log(
      `The player currently has ${playerPoints} points. Hit or Stay? (Computer has ${compPoints} points)`
    );
  }
}
let playerStr = "The player's hand: ";
function showPlayer() {
  playerStr = "The player's hand: ";
  playerHand.forEach((card) => {
    playerStr += `${card.face} of ${card.suit}, `;
  });
  console.log(playerStr);
}
let compStr = "The computer's hand: ";
function showComp() {
  compHand.forEach((card) => {
    compStr += `${card.face} of ${card.suit}, `;
  });
  console.log(compStr);
}
function playerHit() {
  playerHand.push(shuffledeck.pop());
  showPlayer();
  playerEval();
}
function playerStay() {
  console.log(`You chose to stay! What will the computer do?`);
  computerHit();
}
function computerHit() {
  compStr = "The computer's hand: "
  showComp();
  compPoints = 0;
  compHand.forEach((card) => {
      compPoints += card.value;
  });
  if (compPoints < 17) {
      console.log(`Computer Hits!`);
      compHand.push(shuffledeck.pop());
      computerHit();
  } else if (compPoints > 21) {
      gameResult = "win";
      console.log(`Computer Busted! You win!`)
  } else if (compPoints > playerPoints) {
      //  comp wins
      gameResult = "lose";
      console.log(`Computer has ${compPoints} points to your ${playerPoints}, you lose!`)
  } else {
      //  comp loses
      gameResult = "win"
      console.log(`Computer has ${compPoints} points to your ${playerPoints}, you win!!`)
  }
}
getDeck();
let shuffledeck = shuffle(deck);
console.log(shuffledeck);
deal();
playerEval();