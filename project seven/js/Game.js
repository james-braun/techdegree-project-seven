/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [];
        this.activePhrase = null;
    }

    // this function creates an array of Phrase objects.
    createPhrases(phrases) {
        for (var i = 0; i < phrases.length; i += 1) {
            this.phrases.push(new Phrase(phrases[i]));
        }
    }

    // this function returns a random Phrase object to startGame().
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    // this function hides the initial screen and gets a Phrase
    // and adds it to the display. 
    startGame() {
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    // this function checks to see if the game has been won.
    checkForWin() {

        // varible to hold all the phrase list items.
        var listItems = document.getElementById('phrase').getElementsByTagName('li');

        // check all the list items in "listItems" if one of them 
        // is a letter that hasn't been "chosen" return false else
        // return true.
        for (var i = 0; i < listItems.length; i += 1) {
            if (listItems[i].className.split(' ')[0] === 'hide') {
                return false;
            }
        }
        return true;
    }

    // this function changes a "liveheart" to a "lostheart" and increaments
    // the number of misses. if the number of misses equals 5 then it
    // ends the game.
    removeLife() {
        var scoreboard = document.getElementById('scoreboard');
        scoreboard.getElementsByTagName('ol')[0].removeChild(scoreboard.getElementsByTagName('li')[0]);
        scoreboard.getElementsByTagName('ol')[0].innerHTML += '<li class="tries"><img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30"></li>';
        this.missed += 1;
        if (this.missed >= 5) {
            this.gameOver(false);
        }
    }

    // this function displays the won/lost screen and
    // resets the game.
    gameOver(gameWon) {

        // display "win" or "lose" screen.
        document.getElementById('overlay').style.display = 'flex';
        if (gameWon) {
            document.getElementById('game-over-message').innerHTML = "You Win!";
            document.getElementById('overlay').className = 'win';
        } else {
            document.getElementById('game-over-message').innerHTML = "You Lose!";
            document.getElementById('overlay').className = 'lose';

        }

        // reset the keyboard so that all keys are enabled and show the right color.
        let buttons = document.getElementById('qwerty').getElementsByTagName('button');
        for (var i = 0; i < buttons.length; i += 1) {
            buttons[i].className = 'key';
            buttons[i].disabled = false;
        }

        // reset the "scoreboard" hearts to all "liveHearts"
        var scoreboard = document.getElementById('scoreboard');

        // remove all hearts from scoreboard.
        for (var i = 0; i < 5; i += 1) {
            scoreboard.getElementsByTagName('ol')[0].removeChild(scoreboard.getElementsByTagName('li')[0]);
        }

        // add back five "liveHearts"
        for (var i = 0; i < 5; i += 1) {
            scoreboard.getElementsByTagName('ol')[0].innerHTML += '<li class="tries"><img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30"></li>';
        }

        // remove event listeners before new game initializes a second one.
        document.getElementById('qwerty').removeEventListener('click', button);
        document.removeEventListener('keyup', key); 
    }

    // this function checks to see if the button clicked or pressed by the player matches a letter
    // in the phrase, and then directs the game based on a correct or incorrect guess.
    handleInteractions(key) {

        // varible holding the buttons of the keyboard.
        const buttons = document.getElementById('qwerty').getElementsByTagName('button');

        // Search though the list of buttons and disable the one
        // matching the key 'clicked' or 'pressed'
        var i = 0;
        while (i < buttons.length) {
            if (buttons[i].textContent === key) {
                buttons[i].disabled = true;
                break;
            }
            i += 1;
        }

        // if key 'clicked' or 'pressed' is in the phrase
        // change its color to blue and show it on the display
        // and check to see if the game is won.
        if (this.activePhrase.checkLetter(key)) {
            buttons[i].className = 'chosen';
            this.activePhrase.showMatchedLetter(key);
            if (this.checkForWin()) {
                this.gameOver(true);
            }

        // else change its color
        // to orange and remove "liveHeart"
        } else {
            buttons[i].className = 'wrong';
            this.removeLife();
        }
    }
}