// get all the keys on the keyboard.
const qwerty = document.getElementById('qwerty');

// get phrase to be guessed.
const phrase = document.getElementById('phrase');

// number of missed guesses.
var missed = 0;

// list of phrases to be guessed.
const phrases = ['the quick brown fox', 'now is the time for all good men', 'four score and seven years ago', 'a stitch in time saves nine', 'i obviously misjudged that one'];

// function returns a rendom phrase.
function getRandomPhraseAsArray(phrases) {

    // Get random number.
    let randomPhraseNumber = Math.floor(Math.random() * phrases.length);

    // return an array of letters instead of a string.
    return phrases[randomPhraseNumber].split('');
}

// function displays the the quote to the screen.
function addPhraseToDisplay(arr) {

    // For every letter in the phrase.
    for (let i = 0; i < arr.length; i++) {

        // Create a list item.
        let listItem = document.createElement('li');

        // insert letter into list item.
        listItem.innerHTML = arr[i];

        // Append to the page.
        document.querySelector("#phrase ul").appendChild(listItem);

        // Add the apropriote class tothe letter.
        if (arr[i] != ' ') {
            listItem.setAttribute('class', 'letter');
        } else {
            listItem.setAttribute('class', 'space');
        }
    }
}

// Start new game. 
document.querySelector('.btn__reset').addEventListener('click', function () {

    // Hide Win/Lose overlay.
    document.getElementById('overlay').style.display = 'none';

    // Number missed = 0;
    missed = 0;

    // Get letters and spaces from previous game if they exist.
    let lettersInList = document.getElementsByClassName('letter');
    let spacesInList = document.getElementsByClassName('space');

    // Remove letters and spaces.
    for (let i = lettersInList.length - 1; i >= 0; i--) {
        lettersInList[i].parentNode.removeChild(lettersInList[i]);
    }
    for (let i = spacesInList.length - 1; i >= 0; i--) {
        spacesInList[i].parentNode.removeChild(spacesInList[i]);
    }

    // get a new phrase.
    let phraseArray = getRandomPhraseAsArray(phrases);

    // Display the phrase.
    addPhraseToDisplay(phraseArray);

    // Initialize buttons.
    let buttons = document.getElementsByTagName('button');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].style.color = "#37474F";
        buttons[i].style.backgroundColor = '#E5E5E5';
    }

    // initialize number of attempts.
    // remove wrong guesses.
    tries = document.getElementsByClassName('tries');
    while (tries.length > 0) {
        tries[0].parentNode.removeChild(tries[tries.length - 1]);
    }

    // add back number of attempts
    for (let i = 0; i < 5; i++) {
        var misses = document.createElement('li');
        document.querySelector('ol').appendChild(misses);
        misses.setAttribute('class', 'tries');
        misses.innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">'
    }
});

// function determines if letter chosen
// is in the phrase.
function checkLetter(buttonClicked) {

    // Get list of letters in phrase.
    let letters = document.querySelectorAll('.letter');

    // Set letter in phrase to no.
    let letter = null;

    // check every letter in phrase against the
    // clicked button.
    for (i = 0; i < letters.length; i++) {

        // If a letter in the phrase matches the button
        // clicked then show the letter in the phrase
        // and return the matching letter.
        if (letters[i].textContent === buttonClicked) {
            letters[i].className += ' show';
            letter = buttonClicked;
        }
    }

    // return matching letter or NULL.
    return letter;
}

// if letter clicked.
document.getElementById('qwerty').addEventListener('click', function () {

    // If you actually clicked a button.
    if (this.tagName === "BUTTON") {

        // Disable button.
        this.disabled = true;
        this.style.backgroundColor = "#5b85b7";
        this.style.color = "white";

        // check to see if letter is in phrase.
        let letterFound = checkLetter(this.textContent);

        // if ketter not in phrase.
        if (letterFound === null) {

            // remove one of your atempts.
            let tries = document.getElementsByClassName('tries');
            tries[0].parentNode.removeChild(tries[0]);

            // Add a missed atempt.
            missed++;
            misses = document.createElement('li');
            tries[0].parentNode.appendChild(misses);
            misses.setAttribute('class', 'tries');
            misses.innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">'
        }

        // Check to see if you have won/lost.
        checkWin();
    }
});

// Function checks to see if you won or lost.
function checkWin() {

    // setup varibles.
    let letter = document.getElementsByClassName('letter');
    let show = document.getElementsByClassName('show');
    let overlay = document.getElementById('overlay');
    let title = document.querySelector('.title');

    // If there are as many letters as there are
    // letters chosen diplay win else if there
    // are more than four misses display lost.
    if (letter.length === show.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        title.innerHTML = 'YOU WIN!';
    } else if (missed > 4) {
        overlay.className = 'lose'
        overlay.style.display = 'flex';
        title.innerHTML = 'YOU LOSE!';
    }
}