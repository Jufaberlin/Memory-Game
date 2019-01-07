const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const deck = document.querySelector(".deck");
const stars = Array.from(document.getElementsByClassName("fa-star"));
const restartButton1 = document.querySelector("#restartButton1");
const restartButton2 = document.querySelector("#restartButton2");
const modal = document.querySelector(".modal");
const modalStars = document.querySelector(".modal-stars");
const movesDisplay = document.querySelector("#moves");
const movesSummary = document.querySelector("#movesSummary");
const secondsDisplay = document.querySelector("#seconds");
const minutesDisplay = document.querySelector("#minutes");
const minutesSummary = document.querySelector("#minutesSummary");
const secondsSummary = document.querySelector("#secondsSummary");

let openCards = [];
let matchedCards = [];
let moves = 0;
let seconds = 0;
let minutes = 0;

// creates a new shuffled game board - click eventListener

function startGame() {
  shuffle(icons);
  openCards = [];
  moves = 0;
  seconds = 0;
  minutes = 0;
  movesDisplay.textContent = moves;
  secondsDisplay.textContent = seconds + "s";
  minutesDisplay.textContent = minutes + "m";
  matchedCards = [];

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

   // clickevent with two clicks possible - shows two symbols and makes them disappear again

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

// function to run the timer in seconds and minutes - display of the timer

function runTimer() {
  seconds++;
  if(seconds === 60) {
    minutes++;
    seconds = 0;
  }
  secondsDisplay.innerHTML = seconds + "s";
  minutesDisplay.innerHTML = minutes + "m";
}

// function to compare the two open cards

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

// function for the star rating

function starRating() {
  const star3 = stars[2];
  const star2 = stars[1];
  const star1 = stars[0];
  if(moves >= 12 && moves <=17) {
    star3.classList.remove("fa-star");
    star3.classList.add("fa-star-o");
  }
  if(moves > 17 && moves <= 20) {
    star2.classList.remove("fa-star");
    star2.classList.add("fa-star-o");
  }
  if(moves > 22) {
    star1.classList.remove("fa-star");
    star1.classList.add("fa-star-o");
  }
}

// events when the game is over

function gameOver() {
    clearInterval(timer);
    modal.classList.add("show-modal");
    modalStars.innerHTML = stars[0].outerHTML + stars[1].outerHTML + stars[2].outerHTML;
    movesSummary.textContent = moves;
    minutesSummary.textContent = minutes + "m";
    secondsSummary.textContent = seconds + "s";
}

// events when the restart button is clicked

function restart() {
  modal.classList.remove("show-modal");
  clearInterval(timer);
  stars.forEach(function(starReset) {
    starReset.className = "fa fa-star";
  });

  deck.innerHTML = "";
  startGame();
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

//eventListeners for the two reset buttons - start of the game

restartButton1.addEventListener("click", restart);
restartButton2.addEventListener("click", restart);
startGame();
