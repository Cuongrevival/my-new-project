const wordDisplay = document.querySelector(".word-display");
const incorrectLetter = document.querySelector(".guesses-text b");
const keyboard = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainButton = gameModel.querySelector("button");
const wordList = [
    {
        word: "benevolent",
        hint: "Showing kindness or goodwill"
    },
    {
        word: "gregarious",
        hint: "Fond of company; sociable"
    },
    {
        word: "meticulous",
        hint: "Showing great attention to detail"
    },
    {
        word: "cognizant",
        hint: "Having knowledge or awareness of something"
    },
    {
        word: "fortuitous",
        hint: "Happening by chance in a lucky way"
    },
    {
        word: "resilient",
        hint: "Able to recover quickly from difficulties"
    },
    {
        word: "scrupulous",
        hint: "Very careful about doing things correctly"
    },
    {
        word: "arduous",
        hint: "Very difficult or requiring great effort"
    },
    {
        word: "ubiquitous",
        hint: "Present or found everywhere"
    },
    {
        word: "voracious",
        hint: "Having a great appetite for food or knowledge"
    },
    {
        word: "infamous",
        hint: "Well known for a bad reason"
    },
    {
        word: "oblivious",
        hint: "Unaware of what is happening around"
    },
    {
        word: "mundane",
        hint: "Lacking excitement; ordinary"
    },
    {
        word: "ambiguous",
        hint: "Open to more than one interpretation"
    },
    {
        word: "reticent",
        hint: "Not revealing one's thoughts or feelings easily"
    },
    {
        word: "placate",
        hint: "To make someone less angry or hostile"
    },
    {
        word: "ardent",
        hint: "Very passionate or enthusiastic"
    },
    {
        word: "pragmatic",
        hint: "Dealing with things in a sensible and realistic way"
    },
    {
        word: "conundrum",
        hint: "A confusing or difficult problem"
    },
    {
        word: "zealous",
        hint: "Showing great energy or enthusiasm"
    },
    {
        word: "surreptitious",
        hint: "Done in a secretive way"
    },
    {
        word: "stoic",
        hint: "Showing little or no emotion in pain or hardship"
    },
    {
        word: "diligent",
        hint: "Showing steady effort and hard work"
    },
    {
        word: "euphemism",
        hint: "A mild word used to replace a harsh one"
    },
    {
        word: "insatiable",
        hint: "Impossible to satisfy"
    },
    {
        word: "juxtapose",
        hint: "To place things side by side for contrast"
    },
    {
        word: "copious",
        hint: "Abundant in quantity"
    },
    {
        word: "altruistic",
        hint: "Showing selfless concern for others"
    },
    {
        word: "fastidious",
        hint: "Very concerned about accuracy and detail"
    },
    {
        word: "epitome",
        hint: "A perfect example of something"
    }
];
let currentWord, correctLetters, wrongGuessCount;

const MAX_GUESSES = 6;


function resetGame() {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "hangman-0.svg";
    incorrectLetter.innerText = `${wrongGuessCount} / ${MAX_GUESSES}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboard.querySelectorAll("button").forEach(button => button.disabled = false);
    gameModel.classList.remove("show");

}

function getRandomWord() {
    // Selecting a random word and hint from the wordList
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;// Making currentWord as random word

    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}

function checkCorrect(isVictory) {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModel.querySelector("img").src = `${isVictory ? 'victory' : 'lost'}.gif`;
    gameModel.querySelector("h4").innerText = isVictory ? 'Correct' : 'Wrong';
    gameModel.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModel.classList.add("show");
    keyboard.querySelectorAll("button").forEach(button => button.disabled = true);


}

function initGame(button, clickedLetter) {

    if (currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (clickedLetter === letter) {
                correctLetters.push(clickedLetter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    incorrectLetter.innerText = `${wrongGuessCount} / ${MAX_GUESSES}`;
    // Calling checkCorrect function if any of these condition meets
    if (wrongGuessCount === MAX_GUESSES) return checkCorrect(false);
    if (new Set(correctLetters).size === new Set(currentWord).size) return checkCorrect(true);
}


// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);


