let min = 1;
let max = 100;

//formula to get random number in a range
// min + Math.random() * (max-min)

let randomNum = (parseInt(min + Math.random() * (max - min)));


const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement('p')

let prevGuess = [];

let numGuesses = 1;

let playGame = true;

if (playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault()
        const guess = parseInt(userInput.value)
        console.log(guess)
        validateGuess(guess)
    })
}

function validateGuess(guess) {
    // validates guess so that it is a valid input between 1-100

    if (isNaN(guess)) {
        alert("Please enter a valid number")
    } else if (guess < 1 || guess > 100) {
        alert("Please enter a number between 1-100")
    } else {
        prevGuess.push(guess)
        if (numGuesses >= 10) {
            displayGuess(guess)
            displayMessage(`Game over. Random number was ${randomNum}`)
            endGame()
        } else {
            console.log(randomNum)

            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function playAudio() {
    const won = new Audio('won.mp3');
    const won2 = new Audio('wontwo.mp3');
    setTimeout(() => {
        won.play();

    }, 3000);
    won2.play();
}

function checkGuess(guess) {
    // checks the guess if it is equal to the random number generated

    if (guess === randomNum) {
        displayMessage(`!! 7 Crore !!`);
        playAudio()
        endGame()
    } else if (guess < randomNum) {
        displayMessage(`Nah! Low guess. Think higher!`);
    } else if (guess > randomNum) {
        displayMessage(`Yuck! Too High guess. Don't fly in sky!`);
    }
}

function displayGuess(guess) {
    // cleans the input field,updates prevGuess array and guess remaining
    userInput.value = ''
    guessSlot.innerHTML += `${guess} `
    numGuesses++;
    remaining.innerHTML = `${11 - numGuesses}`
}

function displayMessage(message) {
    //prints message. low or high
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame() {
    //ends the game
    userInput.value = "";
    userInput.setAttribute("disabled", "")
    p.classList.add('button')
    p.innerHTML = `<button id="newGame">Start new Game</button>`
    startOver.appendChild(p)
    playGame = false;
    newGame()
}

function newGame() {
    const newGameButton = document.querySelector("#newGame")
    newGameButton.addEventListener("click", function (e) {
        randomNum = (parseInt(min + Math.random() * (max - min)));

        prevGuess = []
        numGuesses = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11 - numGuesses}`
        userInput.removeAttribute("disabled")
        startOver.removeChild(p)
        lowOrHi.innerHTML = ''


        playGame = true
    })
}




