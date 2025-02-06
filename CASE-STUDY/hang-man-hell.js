const wordDisplay = document.querySelector(".word-display");
const incorrectLetter = document.querySelector(".guesses-text b");
const keyboard = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainButton = gameModel.querySelector("button");
const wordList = [
    {
        word: "obfuscate",
        hint: "To make something unclear or difficult to understand"
    },
    {
        word: "ephemeral",
        hint: "Lasting for a very short time"
    },
    {
        word: "quixotic",
        hint: "Extremely idealistic and unrealistic"
    },
    {
        word: "serendipity",
        hint: "The occurrence of events by chance in a happy way"
    },
    {
        word: "insidious",
        hint: "Proceeding in a gradual, subtle way with harmful effects"
    },
    {
        word: "esoteric",
        hint: "Understood by only a small group with special knowledge"
    },
    {
        word: "magnanimous",
        hint: "Very generous or forgiving"
    },
    {
        word: "aberration",
        hint: "A departure from what is normal or expected"
    },
    {
        word: "perspicacious",
        hint: "Having keen insight and understanding"
    },
    {
        word: "tenebrous",
        hint: "Dark, shadowy, or obscure"
    },
    {
        word: "sagacious",
        hint: "Having good judgment and wisdom"
    },
    {
        word: "lachrymose",
        hint: "Tending to cry easily; tearful"
    },
    {
        word: "obstreperous",
        hint: "Noisy and difficult to control"
    },
    {
        word: "unctuous",
        hint: "Excessively flattering or ingratiating"
    },
    {
        word: "pulchritude",
        hint: "Physical beauty or attractiveness"
    },
    {
        word: "obsequious",
        hint: "Excessively obedient or submissive"
    },
    {
        word: "recalcitrant",
        hint: "Resisting authority or control"
    },
    {
        word: "perfidious",
        hint: "Deceitful and untrustworthy"
    },
    {
        word: "intransigent",
        hint: "Unwilling to change one's views"
    },
    {
        word: "sycophant",
        hint: "A person who acts overly submissive to gain favor"
    },
    {
        word: "susurrus",
        hint: "A soft murmuring or whispering sound"
    },
    {
        word: "torpid",
        hint: "Mentally or physically inactive; sluggish"
    },
    {
        word: "chicanery",
        hint: "The use of trickery to achieve a goal"
    },
    {
        word: "antediluvian",
        hint: "Extremely old or outdated"
    },
    {
        word: "capricious",
        hint: "Prone to sudden changes in mood or behavior"
    },
    {
        word: "pusillanimous",
        hint: "Showing a lack of courage or determination"
    },
    {
        word: "vituperative",
        hint: "Bitter and abusive in language"
    },
    {
        word: "antediluvian",
        hint: "Extremely old or outdated"
    },
    {
        word: "sesquipedalian",
        hint: "Given to using long words"
    },
    {
        word: "verisimilitude",
        hint: "The appearance of being real or true"
    }
];
let currentWord3, correctLetters3, wrongGuessCount3;

const MAX_GUESSES = 6;


function resetGame() {
    correctLetters3 = [];
    wrongGuessCount3 = 0;
    hangmanImage.src = "hangman-0.svg";
    incorrectLetter.innerText = `${wrongGuessCount3} / ${MAX_GUESSES}`;
    wordDisplay.innerHTML = currentWord3.split("").map(() => `<li class="letter"></li>`).join("");
    keyboard.querySelectorAll("button").forEach(button => button.disabled = false);
    gameModel.classList.remove("show");

}

function getRandomWord() {
    // Selecting a random word and hint from the wordList
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord3 = word;// Making currentWord3 as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}

function checkCorrect(isVictory) {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModel.querySelector("img").src = `${isVictory ? 'victory' : 'lost'}.gif`;
    gameModel.querySelector("h4").innerText = isVictory ? 'Correct' : 'Wrong';
    gameModel.querySelector("p").innerHTML = `${modalText} <b>${currentWord3}</b>`;
    gameModel.classList.add("show");
    if (isVictory) {

    }
    keyboard.querySelectorAll("button").forEach(button => button.disabled = true);


}

function initGame(button, clickedLetter) {

    if (currentWord3.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord3].forEach((letter, index) => {
            if (clickedLetter === letter) {
                correctLetters3.push(clickedLetter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount3 and hangman image
        wrongGuessCount3++;
        hangmanImage.src = `hangman-${wrongGuessCount3}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    incorrectLetter.innerText = `${wrongGuessCount3} / ${MAX_GUESSES}`;
    // Calling checkCorrect function if any of these condition meets
    if (wrongGuessCount3 === MAX_GUESSES) return checkCorrect(false);
    if (new Set(correctLetters3).size === new Set(currentWord3).size) return checkCorrect(true);
}


// Creating keyboard buttons and adding event listeners
for (let k = 97; k <= 122; k++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(k);
    keyboard.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(k)));
}
getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);


