/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    // this function adds a Phrase to the display.
    addPhraseToDisplay() {

        // this varible splits the phrase string into a character array.
        var letterArray = this.phrase.split('');

        // this varible holds the html of the phrase to add to the dom.
        var listElements = '<ul>';

        // for every letter in the array add a list element to "listElements"
        for (var i = 0; i < letterArray.length; i += 1) {
            if (letterArray[i] === ' ') {
                listElements += '<li class="space"> </li>';
            } else {
                listElements += '<li class="hide letter ' + letterArray[i] + '">' + letterArray[i] + '</li>';
            }
        }

        // add a closing ul tag to "listElements"
        listElements += '</ul>';

        // add "listElements" to the dom.
        document.getElementById('phrase').innerHTML = listElements;
    }

    // this function checks if a letter is in the phrase
    checkLetter(letter) {

        // varible holds phrase to be tested.
        var listItems = document.getElementById('phrase').getElementsByTagName('li');

        // for every letter in "listItems" test against "letter" and 
        // if there is a match return true else return false.
        for (var i = 0; i < listItems.length; i += 1) {
            if (letter.toUpperCase() === listItems[i].innerHTML.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    // this function reveals the letter(s) on the board that matches the player's selection
    showMatchedLetter(letter) {

        // varible holds phrase 
        var matchElement = document.getElementById('phrase').getElementsByTagName('li');

        // for every element in "matchElement" if "letter" matches then show letter.
        for (var i = 0; i < matchElement.length; i += 1) {
            if (letter.toUpperCase() === matchElement[i].innerHTML.toUpperCase()) {
                matchElement[i].className = 'show letter ' + letter;
            }
        }
    }
}