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
    var remainingGuesses = 0;
    // Array to hold letters that have been guessed.
    var lettersGuessed = [];
    // Array to display the incorrect letters that have been guessed
    var incorrectLettersGuessed = [];
    // Word that is displayed to user based on correct letters guessed
    var wordDisplayed = "";

    // RENDERING HTML FUNCTIONS
    // ==============================================================================

    // Function to render words.
    function renderHyphenatedWord() {
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

    //Function to replace "-" with actual letters
    function updateDisplayedWord(charIndices, userInput) {
      for(var i = 0; i < charIndices.length; i++) {
        wordDisplayed = setCharAt(wordDisplayed, charIndices[i], userInput);
        document.querySelector("#current-word").innerHTML = wordDisplayed;
      }
    }

    //Function to update the number of remaining guesses the user has
    function renderRemainingNumberGuesses() {
      document.querySelector("#remaining-number-guesses").innerHTML = "Number of Guesses Remaining: \n" + remainingGuesses;
    }

    //Function to display the incorrect letters that have been guessed
    function renderIncorrectGuesses() {
      document.querySelector("#incorrect-guesses").innerHTML = "Incorrect letters guessed: \n" +  incorrectLettersGuessed.toString();
    }
    
    // Function that updates the number of wins...
    function renderWins() {
      document.querySelector("#wins").innerHTML = "Wins: " + wins;
    }

    function renderWinningDetails() {
      document.querySelector("#winning-word").innerHTML = words[wordIndex] + " by Young Thug";
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
      var letterIndex = words[wordIndex].indexOf(" ");

      if (letterIndex > -1) {
        hyphenatedWord = setCharAt(hyphenatedWord, letterIndex, " ");
      } 
      
      return hyphenatedWord;
    }

    // Function that checks character input
    function isValidInput(input) {
      // Regular expression to check user input a letter and not some other character
      var reg = /^[a-z]+$/i;

      return reg.test(input);
    }

    function findCharIndices(input) {
      var indices = [];
      for(var i=0; i<words[wordIndex].length;i++) {
        if (words[wordIndex][i].toLowerCase() === input) indices.push(i);
      }
      return indices;
    }

    // Function to replace specific character in word displayed
    function setCharAt(str,index,chr) {
      if(index > str.length-1) return str;
      return str.substr(0,index) + chr + str.substr(index+1);
    }

    function startGame() {
      renderHyphenatedWord();
      renderWins();
      remainingGuesses = words[wordIndex].length;
      renderRemainingNumberGuesses();
      renderIncorrectGuesses();
    }

    function reset() { 
      wordIndex++;
      //remainingGuesses = words[wordIndex].length;
      lettersGuessed = [];
      incorrectLettersGuessed = [];
      
    }

    function hasGameEnded() {
      if (remainingGuesses == 0) {
        return true;
      } else if (wordDisplayed == words[wordIndex].toLowerCase()) {
        wins++;
        renderWinningDetails();
        return true;
      } else {
        return false;
      }
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
          var letterIndex = words[wordIndex].toLowerCase().indexOf(userInput);

          // if letter is in word, replace all instances of the character in the word displayed to user
          if (letterIndex > -1) {

            //find all instances of char and replace them in the displayed word
            var indices = findCharIndices(userInput);
            updateDisplayedWord(indices, userInput);
            
          } else {
            //if letter is not in word, add to array of incorrect letters guessed
            incorrectLettersGuessed.push(userInput);
            renderIncorrectGuesses();
            remainingGuesses--;
            renderRemainingNumberGuesses();
          }

          //add to array of letters already guessed and decrement number of remaining guesses
          lettersGuessed.push(userInput);

          if (hasGameEnded()) {
            reset();
            startGame();
          }

        } else {
          alert("That letter has been guessed.")
        }
        
      } else {
        alert("Please enter a letter character.")
      }

      

    };