const wordDisplay = document.querySelector(".word-display");
const incorrectLetter = document.querySelector(".guesses-text b");
const keyboard = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainButton = gameModel.querySelector("button");
const wordList = [
    {
        word: "guitar",
        hint: "A musical instrument with strings."
    },
    {
        word: "oxygen",
        hint: "A colorless, odorless gas essential for life."
    },
    {
        word: "mountain",
        hint: "A large natural elevation of the Earth's surface."
    },
    {
        word: "banana",
        hint: "A long yellow fruit that monkeys love"
    },
    {
        word: "cat",
        hint: "A small pet that loves to chase mice"
    },
    {
        word: "dog",
        hint: "A loyal pet that barks"
    },
    {
        word: "sun",
        hint: "The big bright star that gives us light"
    },
    {
        word: "moon",
        hint: "A round object in the night sky"
    },
    {
        word: "car",
        hint: "A vehicle with four wheels"
    },
    {
        word: "tree",
        hint: "A tall plant with green leaves"
    },
    {
        word: "fish",
        hint: "An animal that swims in water"
    },
    {
        word: "bird",
        hint: "An animal that flies and sings"
    },
    {
        word: "milk",
        hint: "A white liquid from cows"
    },
    {
        word: "bread",
        hint: "A common food made from flour"
    },
    {
        word: "chair",
        hint: "A piece of furniture to sit on"
    },
    {
        word: "table",
        hint: "A flat surface with legs used for eating or working"
    },
    {
        word: "house",
        hint: "A place where people live"
    },
    {
        word: "water",
        hint: "A clear liquid that we drink"
    },
    {
        word: "pen",
        hint: "A tool used for writing"
    },
    {
        word: "book",
        hint: "A collection of pages with stories or information"
    },
    {
        word: "clock",
        hint: "A device used to tell time"
    },
    {
        word: "hat",
        hint: "Something you wear on your head"
    },
    {
        word: "ball",
        hint: "A round object used in games"
    },
    {
        word: "shirt",
        hint: "A piece of clothing for the upper body"
    },
    {
        word: "shoe",
        hint: "Something you wear on your feet"
    },
    {
        word: "door",
        hint: "An entrance to a room or building"
    },
    {
        word: "key",
        hint: "A small object used to unlock doors"
    },
    {
        word: "lamp",
        hint: "A device that gives light"
    },
    {
        word: "phone",
        hint: "A device used for calling people"
    },
    {
        word: "leaf",
        hint: "A green part of a plant or tree"
    },
    {
        word: "egg",
        hint: "A round food laid by chickens"
    },
    {
        word: "star",
        hint: "A bright object in the night sky"
    },
    {
        word: "rain",
        hint: "Water falling from clouds"
    }
];
let currentWord1, correctLetters1, wrongGuessCount1;

const MAX_GUESSES = 6;


function resetGame() {
    correctLetters1 = [];
    wrongGuessCount1 = 0;
    hangmanImage.src = "hangman-0.svg";
    incorrectLetter.innerText = `${wrongGuessCount1} / ${MAX_GUESSES}`;
    wordDisplay.innerHTML = currentWord1.split("").map(() => `<li class="letter"></li>`).join("");
    keyboard.querySelectorAll("button").forEach(button => button.disabled = false);
    gameModel.classList.remove("show");

}

function getRandomWord() {
    // Selecting a random word and hint from the wordList
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord1 = word;// Making currentWord1 as random word

    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}

function checkCorrect(isVictory) {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModel.querySelector("img").src = `${isVictory ? 'victory' : 'lost'}.gif`;
    gameModel.querySelector("h4").innerText = isVictory ? 'Correct' : 'Wrong';
    gameModel.querySelector("p").innerHTML = `${modalText} <b>${currentWord1}</b>`;
    gameModel.classList.add("show");
    keyboard.querySelectorAll("button").forEach(button => button.disabled = true);


}

function initGame(button, clickedLetter) {

    if (currentWord1.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord1].forEach((letter, index) => {
            if (clickedLetter === letter) {
                correctLetters1.push(clickedLetter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount1 and hangman image
        wrongGuessCount1++;
        hangmanImage.src = `hangman-${wrongGuessCount1}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    incorrectLetter.innerText = `${wrongGuessCount1} / ${MAX_GUESSES}`;
    // Calling checkCorrect function if any of these condition meets
    if (wrongGuessCount1 === MAX_GUESSES) return checkCorrect(false);
    if (new Set(correctLetters1).size === new Set(currentWord1).size) return checkCorrect(true);
}


// Creating keyboard buttons and adding event listeners
for (let j = 97; j <= 122; j++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(j);
    keyboard.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(j)));
}
getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);


