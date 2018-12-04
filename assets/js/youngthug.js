// VARIABLES
    // ==========================================================================

    // The array of songs for hangman.
    var words = [ 
      "Worth It" ,
      "Feel It"
    ];

    // We start the game with a score of 0.
    var wins = 0;
    // Variable holding the index of the word being guessed
    var wordIndex = 0;
    // Variable to number of remaining letter guesses.
    var remainingGuesses = 10;
    // Array to hold letters that have been guessed.
    var lettersGuessed = [];
    // Array to display the incorrect letters that have been guessed
    var incorrectLettersGuessed = [];
    // Word that is displayed to user based on correct letters guessed
    var wordDisplayed = "";

    // FUNCTIONS
    // ==============================================================================

    // Function to render words.
    function renderWord() {
      // If there are still more words, render the next one.
      if (wordIndex <= (words.length - 1)) {
        wordDisplayed = hyphenateWord(words[wordIndex]);
        document.querySelector("#current-word").innerHTML = wordDisplayed;
      }
      // If there aren't, render the end game screen.
      else {
        document.querySelector("#current-word").innerHTML = "Game Over!";
        document.querySelector("#wins").innerHTML = "Total Wins: " + wins + " out of " + words.length;
      }
    }

    function hyphenateWord(word) {
      var hyphenatedWord = "";
      for (var i = 0; i < word.length; i++) {
        hyphenatedWord += "_";
        console.log(hyphenatedWord);
      }
      return hyphenatedWord;
    }

    // Function that updates the number of wins...
    function updateWins() {
      document.querySelector("#wins").innerHTML = "Wins: " + wins;
    }

    // Function that checks character input
    function isValidInput(input) {
      // Regular expression to check user input a letter and not some other character
      var reg = /^[a-z]+$/i;

      return reg.test(input);
    }

    // Function to replace specific character in word displayed
    function setCharAt(str,index,chr) {
      if(index > str.length-1) return str;
      return str.substr(0,index) + chr + str.substr(index+1);
    }

    function reset() { 

    }

    function hasGameEnded() {
      if (remainingGuesses == 0) {
        alert("You Lost :(");
        return true;
      } else if (wordDisplayed == words[wordIndex]) {
        alert("You Won!");
        return true;
      } else {
        return false;
      }
    }

    // MAIN PROCESS
    // ==============================================================================

    // Calling functions to start the game.
    renderWord();
    updateWins();

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
          var letterIndex = words[wordIndex].indexOf(input);

          // if letter is in word, replace character in the word displayed to user
          if (letterIndex > -1) {
            wordDisplayed = setCharAt(wordDisplayed, letterIndex, userInput);
            document.querySelector("#current-word").innerHTML = wordDisplayed;
            
          } else {
            //if letter is not in word, add to array of incorrect letters guessed
            incorrectLettersGuessed.push(userInput);
            document.querySelector("#incorrect-guesses").innerHTML = incorrectLettersGuessed.toString();
          }

          //add to array of letters already guessed and decrement number of remaining guesses
          lettersGuessed.push(userInput);
          remainingGuesses--;
        } else {
          alert("That letter has been guessed.")
        }
        
      } else {
        alert("Please enter a letter character.")
      }

      hasGameEnded()

    };