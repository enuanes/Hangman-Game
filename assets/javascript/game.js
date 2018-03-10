// Creating a giant hangmanGame object that will house all of our logic and variables
var hangmanGame = {

    //Object of all words that can be chosen, along with info such as their picture and a sound clip
    wordsToPick: {
        panda: {
            picture: "panda.jpg",
            preview: "http://www.billybear4kids.com/animal/sounds/panda.wav"
        },
        zebra: {
            picture: "zebra.jpg",
            preview: "https://www.wildlifelands.com/wxs/Zebra.mp3"
        },
        bat: {
            picture: "bat.jpg",
            preview: "http://bertrik.sikken.nl/bat/wav/bat1.mp3"
        },
        camel: {
            picture: "camel.jpg",
            preview: "images/camelSound.mp3"
        },
        gorilla: {
            picture: "gorilla.jpg",
            preview: "http://static1.grsites.com/archive/sounds/animals/animals028.mp3"
        },
        jaguar: {
            picture: "jaguar.jpg",
            preview: "images/jaguarSound.mp3"
        },
        koala: {
            picture: "koala.jpg",
            preview: ""
        },
        reindeer: {
            picture: "reindeer.jpg",
            preview: ""
        },
        sloth: {
            picture: "sloth.jpg",
            preview: ""
        },
        wolf: {
            picture: "wolf.jpg",
            preview: "http://audiosoundclips.com/wp-content/uploads/2012/01/Wolfhowl.mp3"
        },
        elephant: {
            picture: "elephant.jpg",
            preview: "http://audiosoundclips.com/wp-content/uploads/2011/12/Elephanttrumpet.mp3"
        },
        lion: {
            picture: "lion.jpg",
            preview: "http://audiosoundclips.com/wp-content/uploads/2011/12/Lionroar.mp3"
        },
        orangutan: {
            picture: "orangutan.jpg",
            preview: "images/orangutanSound.mp3"
        },
        tiger: {
            picture: "tiger.jpg",
            preview: "http://static1.grsites.com/archive/sounds/animals/animals026.mp3"
        },
        owl: {
            picture: "owl.jpg",
            preview: "http://static1.grsites.com/archive/sounds/animals/animals074.mp3"
        },
        capybara: {
            picture: "capybara.jpg",
            preview: ""
        },
        otter: {
            picture: "otter.jpg",
            preview: ""
        },
        lynx: {
            picture: "lynx.jpg",
            preview: "http://waterandwoods.net/downloads/lynx.mp3"
        },
        oryx: {
            picture: "oryx.jpg",
            preview: ""
        },
        ibex: {
            picture: "ibex.jpg",
            preview: ""
        },
        cougar: {
            picture: "cougar.jpg",
            preview: "http://static1.grsites.com/archive/sounds/animals/animals042.mp3",
        },
        porcupine: {
            picture: "porcupine.jpg",
            preview: ""
        },
        emu: {
            picture: "emu.jpg",
            preview: ""
        },
        myna: {
            picture: "myna.jpg",
            preview: "images/mynaSound.mp3"
        },
        guanaco: {
            picture: "guanaco.jpg",
            preview: ""
        },
        marmoset: {
            picture: "marmoset.jpg",
            preview: "images/marmosetSound.mp3"
        }
    },

    // Variables that set the initial state of our hangman game
    wordInPlay: null,
    lettersOfTheWord: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,

    // The setUpGame method is called when the first page loads.
    setUpGame: function() {
        //Here we pick a random word.
        var objKeys = Object.keys(this.wordsToPick);
        this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

        // Split the chosen word up into its individual letters.
        this.lettersOfTheWord = this.wordInPlay.split("");
        // Builds the representation of the word we are trying to guess and displays it on the page.
        // At the start it will be all underscores since we haven't guessed any letter ("_ _ _ _").
        this.rebuildWordView();
        // This function sets the number of guesses the user gets and renders it to the HTML.
        this.processUpdateTotalGuesses(); 
    },

    // This function is run whenever the user guesses a letter.
    updatePage: function(letter) {
        // If the user has no guesses left, restart the game.
        if (this.guessesLeft === 0) {
            this.restartGame();
        }
        // Otherwise
        else {
         // Check for and handle incorrect guesses
         this.updateGuesses(letter);
         
         // Check for and handle correct guesses
         this.updateMatchedLetters(letter);

         // Rebuild the view of the word. Guessed letters are revealed, unguessed letters have a "_".
         this.rebuildWordView();

         // If the user wins, restart the game.
         if(this.updateWins() === true) {
             this.restartGame();
         }
        }
    },

    // This function governs what happens when the user makes an incorrect guess that they have not guessed before.
    updateGuesses: function(letter) {
        // If the letter is not in the guessedLetters array and the letter is not in the lettersOfTheWord array..
        if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

            // Add the letter to the guessedLetters array
            this.guessedLetters.push(letter);

            // Decrease guesses by one.
            this.guessesLeft--;

            // Update guesses remaining and guessed letters on the page.
            document.querySelector("#guessesRemaining").innerHTML = this.guessesLeft;
            document.querySelector("#guessedLetters").innerHTML = this.guessedLetters.join(", ");
        }
    },

    // This function sets the initial guesses the user gets.
    processUpdateTotalGuesses: function() {
        // The user will get more guesses the longer the word is.
        this.totalGuesses = this.lettersOfTheWord.length + 5;
        this.guessesLeft = this.totalGuesses;

        // Render the guesses left to the page.
        document.querySelector("#guessesRemaining").innerHTML = this.guessesLeft; 
    },

    // This function governs what happens if the user makes a successful guess.
    updateMatchedLetters: function(letter) {
        // Loop through the letters of the solution.
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            // If the guessed letter is in the solution, and we haven't guessed it already..
            if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                // Push the newly guessed letter into the matchedLetters array.
                this.matchedLetters.push(letter); 
            }
        }
    },

    // This function builds the display of the word that is currently being guessed.
    // For example, if we are trying to guess the word "panda", it might display "p_nd_".
    rebuildWordView: function() {
        //We start with an empty string.
        var wordView = "";

        // Loop through the letters of the word we are trying to guess..
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            // If the current letter has been guessed, display that letter.
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
                wordView += this.lettersOfTheWord[i];
            }
            // If it hasn't been guessed, display a "_" instead.
            else {
                wordView += "&nbsp;_&nbsp;";
            }
        }

        // Update the page with the new string we built.
        document.querySelector("#currentWord").innerHTML = wordView;
    },

    // Function that restarts the game by resetting all of the variables.
    restartGame: function() {
        document.querySelector("#guessedLetters").innerHTML = "";
        this.wordInPlay = null;
        this.lettersOfTheWord = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.setUpGame();
        this.rebuildWordView();
    },

    // Function that checks to see if the user has won.
    updateWins: function() {
        var win;

        // "this" won't work for words with double or triple letters
        // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); // Clones the array
        // this. matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

        // If you haven't correctly guessed a letter in the word yet, we set win to false
        if (this.matchedLetters.length === 0) {
            win = false;
        }
        // Otherwise, we set win to true.
        else {
            win = true;
        }

        // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
        // In English, if you haven't yet guessed all the letters in the word, you don't win.
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
                win = false;
            }
        }

        // If win is true
        if (win) {

            // Increment wins.
            this.wins = this.wins + 1;

            // Update wins on the page.
            document.querySelector("#wins").innerHTML = this.wins;

            // Update the image of the animal on the page.
            document.querySelector("#animalDiv").innerHTML =
             "<img class='animalImage' src='images/" +
             this.wordsToPick[this.wordInPlay].picture + "' alt='" +
             this.wordsToPick[this.wordInPlay].preview + "'>";

             // Play an audio of the animal
            var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
            audio.play();
            
            // Return true, which will trigger the restart of our game in the updatePage function.
            return true;
        }
        // If win is false, return false to the updatePage function. The game goes on!
        return false;
    }
};

// Initialize the game when the page loads
hangmanGame.setUpGame();

//When a key is pressed..
document.onkeyup = function(event) {
    // Capture pressed key and make it lowercase
    hangmanGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    // Pass the guessed letter into our updatePage function to run the game logic.
    hangmanGame.updatePage(hangmanGame.letterGuessed);
};