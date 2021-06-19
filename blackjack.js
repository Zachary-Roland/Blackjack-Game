const suit = ["spades", "hearts", "diamonds", "clubs"];
      const face = [
        "ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "jack",
        "queen",
        "king",
      ];
      const playerHand = new Array();
      const compHand = new Array();
      let deck = new Array();
      let playerPoints = 0;
      let compPoints = 0;
      let gameResult;
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
        // console.log(
        //   `The player's cards are: ${playerHand[0].face} of ${playerHand[0].suit} & ${playerHand[1].face} of ${playerHand[1].suit}!`
        // );
        // console.log(
        //   `The computer's cards are: ${compHand[0].face} of ${compHand[0].suit} & ${compHand[1].face} of ${compHand[1].suit}!`
        // );
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
        // console.log(`The player currently has ${playerPoints} points.`);
        // console.log(`The computer currently has ${compPoints} points.`);
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
      // for each loop to console log the players hand regardless of card amount
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
      function computerHit() {
        compStr = "The computer's hand: "
        console.log(`Computer Hits!`);
        compHand.push(shuffledeck.pop());
        showComp();
        compPoints = 0;
        compHand.forEach((card) => {
          compPoints += card.value;
        });
        if (compPoints < 17) {
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
      function playerStay() {
        console.log(`You chose to stay! What will the computer do?`);
        computerHit();
      }
      getDeck();
      let shuffledeck = shuffle(deck);
      console.log(shuffledeck);
      deal();
      playerEval();