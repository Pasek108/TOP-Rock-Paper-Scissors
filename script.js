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

    if (winArray[player][computer] === -1) {
        return `(You: ${options[player]}, PC: ${options[computer]}). You Lose!`
    }

    if (winArray[player][computer] === 1) {
        return `(You: ${options[player]}, PC: ${options[computer]}). You Win!`
    }

    return `(You: ${options[player]}, PC: ${options[computer]}). Draw!`
}

function playGame() {
    const playerSelection = prompt()
    const computerSelection = getComputerChoice();
    console.log(playRound(playerSelection, computerSelection));
}

for (let i = 0; i < 5; i++) playGame()
