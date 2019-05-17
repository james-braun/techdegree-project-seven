/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// game varible holds a game.
var game;

// list of phrases to be used in the game.
const phrases = ['There she blows', 'Superman lives', 'Dime for a fortyniner', 'I came to a conclusion', 'Hugh Hefner is God'];


// on clicking the overlay button start a new game.
document.getElementById('btn__reset').addEventListener('click', function () {

    // create a new game.
    game = new Game();

    // add the list of phrases to the game.
    game.createPhrases(phrases);

    // start the game.
    game.startGame();

    // on mouse click pass the contents of the button clicked to handleInteractions().
    document.getElementById('qwerty').addEventListener('click', button);

    // on key press pass the contents of the button pressed to handleInteractions().
    document.addEventListener('keyup', key); 
});

// on mouse click pass the contents of the button clicked to handleInteractions().
button = function (event) {
    if (event.target.tagName === "BUTTON") {
        game.handleInteractions(event.target.textContent);
    }
}

// on key press pass the contents of the button pressed to handleInteractions().
key = function (event) {
    if (/[a-z]/.test(event.key)) {
        game.handleInteractions(event.key);
    }
}

