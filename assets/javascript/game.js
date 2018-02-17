var words =['gorilla', 'panda', 'koala', 'bat', 'sloth', 'reindeer', 'camel', 'wolf', 'iguana', 'jaguar'];
var wins = 0;
var loss = 0;
var wrongLetter = [];
var guessesLeft = 9;
var underScores = [];
var userGuesses = [];
var randomWord;
var winCounter = 0;

//Function

function startGame() {
    //Picks random word
    randomWord = words[Math.floor(Math.random() * words.length)];
    
    for (var i = 0; i < randomWord.length; i++) {
        underScores.push('_');
    }
    //Printing underscores to the screen
    document.getElementById('word-blanks').textContent = underScores.join(" ");

    //Reset
    wrongLetter = [];
    guessesLeft = 9;
    
    //HTML
    document.getElementById('guesses-left').textContent = guessesLeft;

};

function winLose() {
    if(winCounter === randomWord.length) {
        alert ('You WIN!!');
        startGame();
    }
    else if(guessesLeft === 0) {
        alert('Sorry, try again.');
        startGame();
    }
}
//User Guesses
document.onkeyup = function(event) {
    userGuesses = event.key;

    //Checking to see if the letter exists inside of the word
    if(randomWord.indexOf(userGuesses) > -1) {
        for(var i = 0; i < randomWord.length; i++) {
            if(randomWord[i] === userGuesses) {
                underScores[i] = userGuesses;
                winCounter++;
                winLose();
            }
        }
    } else {
        wrongLetter.push(userGuesses);
        guessesLeft--;
        winLose();
    }
};



startGame();