 const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
 const deck = document.querySelector(".deck");
 const restart = document.querySelector(".restart");
 const movesDisplay = document.querySelector("#moves");
 const movesSummary = document.querySelector("#movesSummary");
 const minutesSummary = document.querySelector("#minutesSummary");
 const secondsSummary = document.querySelector("#secondsSummary");

 let openCards = [];
 let matchedCards = [];
 let moves = 0;
 let seconds = 0;
 let minutes = 0;

    // create new shuffled game board

function startGame() {
  shuffle(icons);
  movesDisplay.textContent = moves;

  for (let j = 0; j < icons.length; j++) {
     let li = document.createElement("li");
     let i = document.createElement("i");
     i.setAttribute("class", icons[j]);
     li.classList.add("card");
     deck.appendChild(li);
     li.appendChild(i);
     li.addEventListener("click", showSymbol);
  }
}

   // clickevent with two clicks possible

function showSymbol(event) {
    let clickedCard = event.target;
    if(clickedCard.tagName == "LI" && openCards.length  <=1 && !clickedCard.classList.contains("open") && !clickedCard.classList.contains("show") && !clickedCard.classList.contains("match")) {
        clickedCard.classList.add("show");
        clickedCard.classList.add("open");
        openCards.push(clickedCard);
        if(openCards.length == 2) {
          compareCards();
        }
        if(matchedCards.length == icons.length) {
          gameOver();
        }
        if(moves == 0 && openCards.length == 1) {
          timer = setInterval(function(){
            runTimer();
          }, 1000);
        }
    }
}


function runTimer() {
  seconds++;
  if(seconds === 60) {
    minutes++;
    seconds = 0;
  }
  document.querySelector("#seconds").innerHTML = seconds + "s";
  document.querySelector("#minutes").innerHTML = minutes + "m";
}

function compareCards() {

        // if the cards match

  	if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        matchedCards.push(openCards[0]);
        matchedCards.push(openCards[1]);
    		openCards = [];
  	} else {

        // if the cards don't match

        if(openCards.length == 2) {
          openCards[0].classList.add("wrong");
          openCards[1].classList.add("wrong");
            setTimeout(function() {
                openCards.forEach(function(cards) {
                cards.classList.remove("open", "show", "wrong");
                });
                openCards = [];
            }, 1000);
        }
    }
    moves++;
    movesDisplay.textContent = moves;
    starRating();
}

function starRating() {
  const star1 = document.querySelector("#star1");
  const star2 = document.querySelector("#star2");
  const star3 = document.querySelector("#star3");
  if(moves >= 12 && moves <=17) {
      star3.classList.remove("fa-star");
      star3.classList.add("fa-star-o");
  } else if(moves > 17 && moves <= 20) {
      star3.classList.remove("fa-star");
      star3.classList.add("fa-star-o");
      star2.classList.remove("fa-star");
      star2.classList.add("fa-star-o");
  } else if(moves > 20) {
      star3.classList.remove("fa-star");
      star3.classList.add("fa-star-o");
      star2.classList.remove("fa-star");
      star2.classList.add("fa-star-o");
      star1.classList.remove("fa-star");
      star1.classList.add("fa-star-o");
  }
}

function gameOver() {
    clearInterval(timer);
    const modal = document.querySelector(".modal");
    modal.classList.add("show-modal");
    starRating();
    movesSummary.textContent = moves;
    minutesSummary.textContent = minutes + "m";
    secondsSummary.textContent = seconds + "s";
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
