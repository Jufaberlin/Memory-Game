/*
 * Create a list that holds all of your cards
 */
 const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
 const deck = document.querySelector(".deck");
 const restart = document.querySelector(".restart");

 let openCards = [];
 let movesDisplay = document.querySelector("span").innerText;
 let movesScore = 0;

    // create new shuffled game board

function startGame() {
  movesScore = 0;
  movesDisplay.textContent = movesScore;
  shuffle(icons);
  for (let j = 0; j < icons.length; j++) {
     let li = document.createElement("li");
     let i = document.createElement("i");
     i.setAttribute("class", icons[j]);
     i.setAttribute("data-card", icons[j]);
     li.classList.add("card");
     deck.appendChild(li);
     li.appendChild(i);
     li.addEventListener("click", showSymbol);
  }
} // yes

   // clickevent with two clicks possible

function showSymbol(event) {
    if(openCards.length <= 1) { // two cards can be opened now
        let clickedCard = event.target;
        clickedCard.classList.add("show"); // yes
        clickedCard.classList.add("open"); // yes
        openCards.push(event.target); // yes
        if(openCards.length == 2) {
            movesScore++; // yes ----- but still no display?!?!?!!?
            compareCards();
        }
    }
}

function compareCards() {

    // if the cards match

  	if (openCards[0].dataset.card == openCards[1].dataset.card) {
    		card.classList.add("match");
    		openCards = [];
  	} else {

        // if the cards don't match

        if(openCards.length == 2) {
            setTimeout(function() {
                openCards.forEach(function(card) {
                card.classList.remove("open", "show");
                });
                openCards = [];
            }, 1000);
        }
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



 startGame();
 restart.addEventListener("click", startGame);
