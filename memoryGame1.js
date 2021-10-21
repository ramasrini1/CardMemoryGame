const gameContainer = document.getElementById("game");
const startGame = document.getElementById("start");
const reStartGame = document.getElementById("reStart");
const result = document.getElementById("result");
const status = document.getElementById("status");
const bestScore = document.getElementById("bestScore");
const clearStorage = document.getElementById("clearStorage");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

//Global variables
let count, card1, card2, score, gameCounter, gameOver, gameInProgress;

initGame();
let shuffledColors = shuffle(COLORS);

// when the DOM loads
startGame.addEventListener("click", handleClickStart);
reStartGame.addEventListener("click", handleClickReStart);

function initGame(){
  count = 0;
  card1 = null;
  card2 = null;
  score = 0;
  gameCounter = 0;
  gameOver = false;
  gameInProgress = false;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
  
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);

  //You double clicked this card, do nothing return
  if (event.target.classList.contains("open")){
    //console.log("card is open ");
     return;
  }
  let color;
 
  if( card1 === null){
    card1 = event.target;
    card1.classList.add("open");
    color = event.target.classList[0];
    card1.style.backgroundColor = color;
    count++;
  } else if( card2 === null){
    //console.log("card2 " + event.target.classList[0]);
    card2 = event.target;
    card2.classList.add("open");
    color = event.target.classList[0];
    card2.style.backgroundColor = color;
    count++;   
  }

  if( card1 !== null && card2 !== null){
    //Both cards are ready to be checked
    score = score + 2;
    if (count === 2){
      //compare cards
      //console.log("first className " + card1.className );
      if( card1.classList[0] === card2.classList[0]){
        //found match, let cards be open
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        count = 0;
        gameCounter = gameCounter + 2;
      } else{
        setTimeout(function() {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("open");
          card2.classList.remove("open");
          card1 = null;
          card2 = null;
          count = 0;
        }, 1000);       
      }
    }
  }
  if (gameCounter === COLORS.length) {
  
      let currentScore = score;
      gameInProgress  = false;
      status.innerHTML = "<h2>Game Over!</h2>";
      result.innerHTML = `<h4>Current Score is ${currentScore}</h4>`;
      let best_score = localStorage.getItem("best_score");
     
      if (best_score !== null){
        if( currentScore < best_score){
          best_score = currentScore;
          localStorage.setItem("best_score", best_score);
        } 
      } else {
        localStorage.setItem("best_score", currentScore);
      }
      setBestScore();
      gameOver = true;       
  }
}

function handleClickStart(event){
  //If game is not in progress and game not over
  //handle start event and set the flags appropirately
  if( gameInProgress === false && gameOver === false){
    gameInProgress = true;
    gameContainer.innerHTML = "";
    status.innerHTML = "<h2>Game In Progress!</h2>";
    result.innerHTML = "";
    setBestScore();
    createDivsForColors(shuffledColors);
  }
}
function setBestScore(){
  let best_score = localStorage.getItem("best_score");
  let res = "";
  if( best_score !== null){
      res = "The best score is " + best_score;
  } 
  bestScore.innerHTML = res;
}

function handleClickReStart(event){
  //If game is over then handle restart button
  if( gameOver === true){
    initGame();
    gameInProgress = true;
    gameContainer.innerHTML = "";
    result.innerHTML = "";
    status.innerHTML = "<h2>Game In Progress!</h2>";
    shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  }
}

clearStorage.addEventListener("click", function(event){
  localStorage.clear();
  bestScore.innerHTML = "";
});
  

