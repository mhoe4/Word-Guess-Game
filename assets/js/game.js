// VARIABLES
// ==========================================================================

// The array of songs for hangman.
var words = [ 
  {title: "Cruise Ship", img: "assets/images/super-slimey.jpg", mp3: "assets/songs/Cruise-Ship.mp3"} ,
  {title: "Worth It", img: "assets/images/ss3.jpg", mp3: "assets/songs/Worth-It.mp3"} ,
  {title: "Feel It", img: "assets/images/btg.jpg", mp3: "assets/songs/Feel-It.mp3"} ,
  {title: "Best Friend", img: "assets/images/bf.jpg", mp3: "assets/songs/Best-Friend.mp3"}
];

// We start the game with a score of 0.
var wins = 0;
// Variable holding the index of the word being guessed
var wordIndex = 0;
// Variable to number of remaining letter guesses.
var remainingGuesses = 0;
// Array to hold letters that have been guessed.
var lettersGuessed = [];
// Array to display the incorrect letters that have been guessed
var incorrectLettersGuessed = [];
// Word that is displayed to user based on correct letters guessed
var wordDisplayed = "";
// Audio element to control audio functions
var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "assets/songs/Cruise-Ship.mp3");
audioElement.autoplay = true;


// RENDERING HTML FUNCTIONS
// ==============================================================================

// Function to render words as a string of hyphens representing the length of the word
function renderHyphenatedWord() {
  wordDisplayed = hyphenateWord(words[wordIndex].title);
  document.querySelector("#current-word").innerHTML = wordDisplayed;
  
}

//Function to replace "-" with actual letters
function updateDisplayedWord(charIndices, userInput) {
  for(var i = 0; i < charIndices.length; i++) {
    wordDisplayed = setCharAt(wordDisplayed, charIndices[i], userInput);
    document.querySelector("#current-word").innerHTML = wordDisplayed;
  }
}

//Function to update the number of remaining guesses the user has
function renderRemainingNumberGuesses() {
  document.querySelector("#remaining-number-guesses").innerHTML = " Number of Guesses Remaining: <br>" + remainingGuesses;
}

//Function to display the incorrect letters that have been guessed
function renderIncorrectGuesses() {
  document.querySelector("#incorrect-guesses").innerHTML = " Incorrect letters guessed: <br>" +  incorrectLettersGuessed.toString();
}

// Function that updates the number of wins...
function renderWins() {
  document.querySelector("#wins").innerHTML = " Wins: " + wins;
}

// when guessed correctly, Display the name of the song that was guessed, its corresponding album art and begin playing the song
function renderWinningDetails() {
  document.querySelector("#winning-word").innerHTML = words[wordIndex].title + " by Young Thug";
  document.querySelector("#img").innerHTML = "<img src=\"" + words[wordIndex].img + "\" alt=\"song-img\" class=\"mx-auto d-block\" >";

  // Set new song and play it
  audioElement.pause();
  audioElement.setAttribute("src", words[wordIndex].mp3);
  audioElement.play();
}

// HELPER FUNCTIONS
// ==============================================================================

// Function returs a string of all '-' to represent the length of the given word
function hyphenateWord(word) {
  var hyphenatedWord = "";
  for (var i = 0; i < word.length; i++) {
    hyphenatedWord += "-";
    console.log(hyphenatedWord);
  }

  // if space is in word, replace '-' with a space
  var letterIndex = words[wordIndex].title.indexOf(" ");
  if (letterIndex > -1) {
    hyphenatedWord = setCharAt(hyphenatedWord, letterIndex, " ");
  } 
  
  return hyphenatedWord;
}

// Function that checks character input
function isValidInput(input) {
  // Regular expression to check user input a letter and not some other character
  var reg = /^[a-z]+$/i;

  // array of inputs to check against
  var exclude = ["shift", "capslock", "control", "contextmenu", "tab", "enter", "numlock",
  "backspace", "end","delete","insert","home","pageup","pagedown", "escape", "alt", "meta",
    "arrowleft","arrowdown","arrowright","arrowup", "scrolllock","pause","printscreen", "clear"];

  //return false if input is in the excludes array
  if (exclude.includes(input)) {
    return false;
  }

  //return true if input is a letter char 'a-z'
  return reg.test(input);
}

//find all instances of the given input char inside the word, returns array of corresponding indices
function findCharIndices(input) {
  var indices = [];
  for(var i=0; i<words[wordIndex].title.length;i++) {
    if (words[wordIndex].title[i].toLowerCase() === input) indices.push(i);
  }
  return indices;
}

// Function to replace specific character in word displayed
function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

//function to start a new game
function startGame() {
  // If there are still more words in the list, start a new game.
  if (wordIndex <= (words.length - 1)) {
    renderHyphenatedWord();
    renderWins();
    remainingGuesses = words[wordIndex].title.length-3;
    renderRemainingNumberGuesses();
    renderIncorrectGuesses();
  }
  // If there aren't, render the end game screen.
  else {
    document.querySelector("#current-word").innerHTML = "Game Over, there are no more songs to guess!";
    document.querySelector("#wins").innerHTML = " Total Wins: " + wins + " out of " + words.length;
  }
  
}

//increment the word index, and reset the letters that have been guessed.
function reset() { 
  wordIndex++;
  lettersGuessed = [];
  incorrectLettersGuessed = [];
}

//determine whether or not the word has been guessed or if the user has run out of guesses.
function hasGameEnded() {
  if (remainingGuesses == 0) {
    return true;
    alert("You have used all of your guesses. Try guessing another song.");
  } else if (wordDisplayed == words[wordIndex].title.toLowerCase()) {
    wins++;
    renderWinningDetails();
    return true;
  } else {
    return false;
  }
}

function playSong() {
  audioElement.play();
}

function pauseSong() {
  audioElement.pause();
}

// MAIN PROCESS
// ==============================================================================

// Calling functions to start the game.
startGame();

// When the user presses a key, it will run the following function...
document.onkeyup = function(event) {

  // If there are no more questions, stop the function.
  if (wordIndex === words.length) {
    return;
  }

  // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
  var userInput = event.key.toLowerCase();

  //check for valid input (letter character)
  if (isValidInput(userInput)) {

    // check if letter has already been guessed
    if (!lettersGuessed.includes(userInput)) {

      // find index of letter inside word
      var letterIndex = words[wordIndex].title.toLowerCase().indexOf(userInput);

      // if letter is in word, replace all instances of the character in the word displayed to user
      if (letterIndex > -1) {

        //find all instances of char and replace them in the displayed word
        var indices = findCharIndices(userInput);
        updateDisplayedWord(indices, userInput);
        
      } else {
        //if letter is not in word, add to array of incorrect letters guessed
        incorrectLettersGuessed.push(userInput);
        renderIncorrectGuesses();
        //decrement number of remaining guesses
        remainingGuesses--;
        renderRemainingNumberGuesses();
      }

      //add to array of letters already guessed and decrement number of remaining guesses
      lettersGuessed.push(userInput);

      //check if game has ended
      if (hasGameEnded()) {
        //if game has ended, reset the game for the next word
        reset();
        //start new game
        startGame();
      }

    }
    
  } 

  

};