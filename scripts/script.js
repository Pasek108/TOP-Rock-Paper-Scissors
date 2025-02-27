"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function getComputerChoice() {
    switch (getRandomInt(3)) {
        case 0: return "rock";
        case 1: return "paper";
        case 2: return "scissors";
    }
}

function playRound(playerSelection, computerSelection) {
    const options = ["rock", "paper", "scissors"]

    const player = options.indexOf(playerSelection.toLowerCase())
    const computer = options.indexOf(computerSelection)

    if (player < 0 || computer < 0) {
        return "Error! You can choose 'Rock', 'Paper' or 'Scissors'"
    }

    const winArray = [
        [0, -1, 1],
        [1, 0, -1],
        [-1, 1, 0],
    ]

    return winArray[player][computer]
}

function playGame(playerSelection) {
    if (Math.abs(score) >= 5) {
        alert("Refresh page to start new game")
        return
    }

    const computerSelection = getComputerChoice()
    const result = playRound(playerSelection, computerSelection)

    score += result
    scoreContainer.innerHTML = score

    switch (result) {
        case -1: resultContainer.innerHTML += "<b>You Lose!</b>"; break;
        case 0: resultContainer.innerHTML += "<b>You Win!</b>"; break;
        case 1: resultContainer.innerHTML += "<b>Draw!</b>"; break;
    }

    resultContainer.innerHTML += `(You: ${playerSelection}, PC: ${computerSelection}). <br>`

    if (Math.abs(score) < 5) return

    resultContainer.innerHTML += `<b><u>You ${score == 5 ? "won" : "lost"} 5 times</u></b>`
}

let score = 0
const resultContainer = document.querySelector(".result")
const scoreContainer = document.querySelector(".score")
