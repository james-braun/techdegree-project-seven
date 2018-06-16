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
            listItem.setAttribute('class','space');
        }
    }
}

document.querySelector('.btn__reset').onclick = function() {
    document.getElementById('overlay').style.display = 'none';
    missed = 0;
    let lettersInList = document.getElementsByClassName('letter');
    let spacesInList = document.getElementsByClassName('space');
    for (let i = lettersInList.length; i > 0; i--) {
        lettersInList[i - 1].remove();
    }
    for (let i = spacesInList.length; i > 0; i--) {
        spacesInList[i - 1].remove();
    }
    let phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    let buttons = document.getElementsByTagName('button');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}


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
    
    for (let i = 0; i < letters.length; i++) {
        if (event.target.textContent == letters[i].textContent) {
            letters[i].className = 'letter chosen';
            console.log(event.target.disabled);
        }
    }
    event.target.disabled = true;
    console.log(event.target.disabled);
    let letterFound = checkLetter(event.target.textContent);
    if (letterFound == null) {
        let tries = document.getElementsByClassName('tries');
        tries[0].remove();
        missed++;
    }
    checkWin();
});

function checkWin() {
    let letter = document.getElementsByClassName('letter');
    let show = document.getElementsByClassName('show');
    let overlay = document.getElementById('overlay');
    let title = document.querySelector('.title');

    console.log(letter.length);
    console.log(show.length);
    console.log(missed);
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