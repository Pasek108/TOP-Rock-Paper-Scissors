"use strict"

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function getComputerChoice() {
  switch (getRandomInt(3)) {
    case 0: return "rock"
    case 1: return "paper"
    case 2: return "scissors"
  }
}

function playRound(playerSelection, computerSelection) {
  const options = ["rock", "paper", "scissors"]

  const player = options.indexOf(playerSelection)
  const computer = options.indexOf(computerSelection)

  const winArray = [
    [0, -1, 1], // rock - [rock, paper, sscissors]
    [1, 0, -1], // paper - [rock, paper, sscissors]
    [-1, 1, 0], // sscissors - [rock, paper, sscissors]
  ]

  return winArray[player][computer]
}

function playGame(playerSelection) {
    rock_button.disabled = true
  paper_button.disabled = true
  scissors_button.disabled = true

  const computerSelection = getComputerChoice()
  const result = playRound(playerSelection, computerSelection)

  action.showAction(playerSelection, computerSelection, result)

  switch (result) {
    case -1: playerGotHit(); break
    case 1: enemyGotHit(); break
  }

  setTimeout(() => {
    rock_button.disabled = null
    paper_button.disabled = null
    scissors_button.disabled = null
  }, 3000)
}

const action = new Action()

const rock_button = document.querySelector(".rock")
rock_button.addEventListener("click", () => playGame("rock"))

const paper_button = document.querySelector(".paper")
paper_button.addEventListener("click", () => playGame("paper"))

const scissors_button = document.querySelector(".scissors")
scissors_button.addEventListener("click", () => playGame("scissors"))
