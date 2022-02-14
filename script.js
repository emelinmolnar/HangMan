let chosenWord = "";
let blankedText = ''; //this will be filled with "_____" instead of the chosen word.
let attemptsLeft = 6;

function chooseWord (word) {
    let newP = document.getElementById("chosenWordParagraph"); 
    let textNode = document.createTextNode(word);
    let wordLength = textNode.length;

    for (let i = 1; i <= wordLength; i++) { //as long as the word.. -> 
        blankedText += '_'; //insert '_' instead of letter
        if (i != wordLength) {
            blankedText += ' '; //if it's not the last letter, insert a blank space, to differentiate one "_" from another
        }
    }
    let blankTextNode = document.createTextNode(blankedText);
    newP.appendChild(blankTextNode);    //place the "_ _ _ _ _" word in page.
    chosenWord = word; //insert the "real" word in the chosenWord.

    document.getElementById('wordBoxInput').value = ""; //Delete the written chosen word, so there's no hint.
    let attemptsParagraph = document.getElementById("attemptsLeftParagraph"); //attemps left.
    textNode = document.createTextNode("You have " + attemptsLeft + " attempts left");
    attemptsParagraph.appendChild(textNode);
    attemptsParagraph.innerHTML = "You have <span id = 'attemptsSpan'>" + attemptsLeft + "</span> attempts left"; //insert a span to make the number of attemps left a different color.
}

String.prototype.replaceAt = function (index, replacement) { //create my own replaceAt, so I can replace the "_" with the actual letter if it's guessed.
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function buttonClicked (buttonValue) {
    let letter = buttonValue.charAt(0); //the buttons have the value as follows: "aButton, bButton, cButton, etc" so the first character is the actual letter.
    let pos = chosenWord.indexOf(letter); //check if the letter's present in the hidden word.
    let buttonClicked = document.getElementById(buttonValue); 
    buttonClicked.parentNode.removeChild(buttonClicked); //remove the pressed button.
    if (pos != -1) { //if the letter's found 
        while (pos != -1) { //there may be multiple "a's, or b's, c's, etc".
            let s = blankedText.replaceAt(pos * 2, letter); //Replace at pos * 2 because I have blank space.
            blankedText = s;
            let newP = document.getElementById("chosenWordParagraph");
            newP.innerHTML = s;
            pos = chosenWord.indexOf(letter, pos + 1); //keep searching starting with the letter next to the previously found one. 
        }
    } else { //the letter is not present in the word.
        attemptsLeft = attemptsLeft - 1;
        document.getElementById("attemptsLeftParagraph").innerHTML = "You have <span id = 'attemptsSpan'>" + attemptsLeft + "</span> attempts left";
    }
    if (attemptsLeft == 0) {
        alert("cuvantul era " + chosenWord + "  Game Over");
        location.reload();

    }

    if (blankedText.indexOf("_") == -1) { 
        alert("You Won");
        location.reload();
    }
}
