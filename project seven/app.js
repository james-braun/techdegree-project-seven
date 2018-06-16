const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

let missed = 0;

const phrases = ['the quick brown fox', 'now is the time for all brave men', 'four score and seven years ago', 'a stitch in time saves nine', 'i obviously misjudged that one'];

function getRandomPhraseAsArray(arr) {
    let randomPhraseNumber = Math.floor(Math.random() * 5);
    return arr[randomPhraseNumber].split('');
}
console.log(getRandomPhraseAsArray(phrases));

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let listItem = document.createElement('li');
        listItem.innerHTML = arr[i];
        document.querySelector("#phrase ul").appendChild(listItem);
        if (arr[i] != ' ') {
            listItem.setAttribute('class', 'letter');
        }
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(buttonClicked) {
    let letters = querySelectorAll('.letter');
    let letter = null;
    for (i = 0; i < letters.length; i++) {
        if (letters[i].textContent === buttonClicked) {
            letters[i].setAttribute('class', 'show');
            letter = buttonClicked;
        }
    }
    return letter;
}