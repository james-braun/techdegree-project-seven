const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

let missed = 0;

const phrases = ['the quick brown fox', 'now is the time for all good men', 'four score and seven years ago', 'a stitch in time saves nine', 'i obviously misjudged that one'];

function getRandomPhraseAsArray(arr) {
    let randomPhraseNumber = Math.floor(Math.random() * 5);
    return arr[randomPhraseNumber].split('');
}

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let listItem = document.createElement('li');
        listItem.innerHTML = arr[i];
        document.querySelector("#phrase ul").appendChild(listItem);
        if (arr[i] != ' ') {
            listItem.setAttribute('class', 'letter');
        } else {
            listItem.setAttribute('class', 'space');
        }
    }
}

document.querySelector('.btn__reset').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'none';
    missed = 0;
    let lettersInList = document.getElementsByClassName('letter');
    let spacesInList = document.getElementsByClassName('space');
    
    for (let i = lettersInList.length - 1; i >= 0; i--) {
        lettersInList[i].parentNode.removeChild(lettersInList[i]);
    }
    for (let i = spacesInList.length - 1; i >= 0; i--) {
        spacesInList[i].parentNode.removeChild(spacesInList[i]);
    }
    let phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    let buttons = document.getElementsByTagName('button');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].style.color = "#37474F";
        buttons[i].style.backgroundColor = '#E5E5E5';
    }
    tries = document.getElementsByClassName('tries');
    
    while (tries.length > 0) {
        tries[0].parentNode.removeChild(tries[tries.length - 1]);
    }
    for (let i = 0; i < 5; i++) {
        misses = document.createElement('li');
        document.querySelector('ol').appendChild(misses);
        misses.setAttribute('class', 'tries');
        misses.innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">'
    }
});


function checkLetter(buttonClicked) {
    let letters = document.querySelectorAll('.letter');
    let letter = null;
    for (i = 0; i < letters.length; i++) {
        if (letters[i].textContent === buttonClicked) {
            letters[i].className += ' show';
            letter = buttonClicked;
        }
    }
    return letter;
}

document.getElementById('qwerty').addEventListener('click', function (event) {
    let letters = document.querySelectorAll('.letter');
    if (event.target.tagName === "BUTTON") {
        event.target.disabled = true;
        event.target.style.backgroundColor = "#5b85b7";
        event.target.style.color = "white";
        let letterFound = checkLetter(event.target.textContent);
        if (letterFound == null) {
            let tries = document.getElementsByClassName('tries');
            tries[0].parentNode.removeChild(tries[0]);
            missed++;
            misses = document.createElement('li');
            tries[0].parentNode.appendChild(misses);
            misses.setAttribute('class', 'tries');
            misses.innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">'
        }
        checkWin();
    }
});

function checkWin() {
    let letter = document.getElementsByClassName('letter');
    let show = document.getElementsByClassName('show');
    let overlay = document.getElementById('overlay');
    let title = document.querySelector('.title');

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