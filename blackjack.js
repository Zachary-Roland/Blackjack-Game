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
const buttonPrimary = document.getElementById("oldButton");
const notOldButton = document.getElementById("notOldButton");
const birthdayInput = document.getElementById("birthday");
const dealButton = document.getElementById("dealButton");
const dealBox = document.getElementById("dealBox");
const stayButton = document.getElementById("stayButton");
const hitButton = document.getElementById("hitButton");
const playerBox = document.getElementById("playerBox");
const compBox = document.getElementById("compBox");
const resultsContainer = document.getElementById("resultsContainer")
let playerStr = "The player's hand: ";
let compStr = "The computer's hand: ";
notOldButton.addEventListener("click", function redirect(){
    window.location=`https://www.sesamestreet.org/`
})
buttonPrimary.addEventListener("click", function verifyAge() {
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
dealButton.addEventListener("click", function disable() {
    dealButton.classList.add("disable");
    stayButton.classList.remove("disable");
    hitButton.classList.remove("disable");
    stayButton.disabled = false;
    hitButton.disabled = false;
    getDeck();
    let shuffledeck = shuffle(deck);
    console.log(shuffledeck);
    deal();
    dealButton.disabled = "disabled"

    playerEval();
    dealButton.removeEventListener("click", function disable() {})
})
hitButton.addEventListener("click", ()=>{
    playerHit();
})
stayButton.addEventListener("click", ()=>{
    hitButton.disabled = "disabled"
    hitButton.classList.add("disable")
    playerStay();
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
  //For each object in player's hand, create a new div w/ an image
//   Make the image source equal to the object's suit and face
  assignCardImg();
  assignCompImg();
  showPlayer();
  showComp();
}
function assignCardImg() {
    playerHand.forEach((i) => {
        const div = document.createElement("div");
        const playerDiv = playerBox.appendChild(div);
        let playerImg = document.createElement("img");
        playerImg.src = `./cardicons/${i.suit}${i.face}.png`
        playerDiv.appendChild(playerImg)
        playerBox.appendChild(playerDiv)
    })
}
function assignCompImg() {
    compHand.forEach((i) => {
        const div = document.createElement("div");
        const newDiv = compBox.appendChild(div);
        let img = document.createElement("img");
        img.src = `./cardicons/backwardscard.png`
        newDiv.appendChild(img)
        compBox.appendChild(newDiv)
    })
}
function revealCompImg() {
    compBox.querySelectorAll("*").forEach(n => n.remove());
    compHand.forEach((i)=>{
        const div = document.createElement("div");
        const newDiv = compBox.appendChild(div);
        let img = document.createElement("img");
        img.src = `./cardicons/${i.suit}${i.face}.png`
        newDiv.appendChild(img)
        compBox.appendChild(newDiv)
    })
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
    revealCompImg();
    resultsContainer.innerText = `It's a tie! What are the odds??`;
  } else if (playerPoints === 21) {
    gameResult = "win"
    revealCompImg();
    resultsContainer.innerText = `You have 21! You win!`;
  } else if (compPoints === 21) {
    gameResult = "lose"
    revealCompImg();
    resultsContainer.innerText = `Dealer has 21! You lose!`;
  } else if (playerPoints > 21) {
    gameResult = "lose"
    revealCompImg();
    resultsContainer.innerText = `Busted! Better luck next time!`;
  } else {
    resultsContainer.innerText = `You have ${playerPoints} points. Hit or Stay?`;
  }
}
function showPlayer() {
  playerStr = "The player's hand: ";
  playerHand.forEach((card) => {
    playerStr += `${card.face} of ${card.suit}, `;
  });
  console.log(playerStr);
}
function showComp() {
  compHand.forEach((card) => {
    compStr += `${card.face} of ${card.suit}, `;
  });
  console.log(compStr);
}
function playerHit() {
  playerHand.push(shuffledeck.pop());
  //remove prior results if any
  playerBox.querySelectorAll("*").forEach(n => n.remove());
  //add images back
  assignCardImg()
  showPlayer();
  playerEval();
}
function playerStay() {
  resultsContainer.innerText = `You chose to stay! What will the Dealer do?`;
  window.setTimeout(()=>{
      revealCompImg();
      computerHit();
  }, 1000)
}
function computerHit() {
  compStr = "The computer's hand: "
  showComp();
  compPoints = 0;
  compHand.forEach((card) => {
      compPoints += card.value;
  });
  if (compPoints < 17) {
      resultsContainer.innerText = `Dealer Hits!`;
      window.setTimeout(()=>{
          compHand.push(shuffledeck.pop());
          revealCompImg();
          computerHit();
      }, 1000)
  } else if (compPoints > 21) {
      gameResult = "win";
      resultsContainer.innerText = `Dealer Busted! You win!`
  } else if (compPoints > playerPoints) {
      //  comp wins
      resultsContainer.innerText = `Dealer Stays`
      window.setTimeout(()=>{
          gameResult = "lose";
          resultsContainer.innerText = `Dealer has ${compPoints} to your ${playerPoints}, you lose!`
      }, 1000)
  } else {
      //  comp loses
      window.setTimeout(()=>{
      gameResult = "win"
      resultsContainer.innerText = `Dealer has ${compPoints} to your ${playerPoints}, you win!!`
    }, 1000)
  }
}
// getDeck();
let shuffledeck = shuffle(deck);
// console.log(shuffledeck);
// deal();
// playerEval();