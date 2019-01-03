
 const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
 const deck = document.querySelector(".deck");
 const restart = document.querySelector(".restart");

 let openCards = [];
 let movesDisplay = document.querySelector("#moves");
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
}

   // clickevent with two clicks possible

function showSymbol(event) {
    if(openCards.length <= 1) {
        let clickedCard = event.target;
        clickedCard.classList.add("show"); 
        clickedCard.classList.add("open"); 
        openCards.push(event.target); 
        if(openCards.length == 2) {
            compareCards();
        }
    }
}

function compareCards() {

        // if the cards match

  	if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
    		openCards = []; 
  	} else {

        // if the cards don't match

        if(openCards.length == 2) {
            setTimeout(function() {
                openCards.forEach(function(cards) {
                cards.classList.remove("open", "show");
                });
                openCards = [];
            }, 1000); 
        }
    }
    movesScore++;
    movesDisplay.textContent = movesScore;
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

 startGame();
 restart.addEventListener("click", startGame);
