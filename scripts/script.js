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

  attack_info.showAttackInfo(playerSelection, computerSelection, result)

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

const attack_info = new AttackInfo()
const result_info = new ResultInfo()

const rock_button = document.querySelector(".rock")
rock_button.addEventListener("click", () => {
  if (player_health == 0 || enemy_health == 0) return
  playGame("rock")
})

const paper_button = document.querySelector(".paper")
paper_button.addEventListener("click", () => {
  if (player_health == 0 || enemy_health == 0) {
    result_info.hideResultInfo()
    player_health = 5
    enemy_health = 5
    player_healthbar.src = `images/health-bar/health-bar-${player_health}.png`
    enemy_healthbar.src = `images/health-bar/health-bar-${enemy_health}.png`
    player.startAnimation(Frog.animations.idle)
    enemy.startAnimation(Frog.animations.idle)
    win_melody.stop()
    lose_melody.stop()
    background_loop.play()
    return
  }
  playGame("paper")
})

const scissors_button = document.querySelector(".scissors")
scissors_button.addEventListener("click", () => {
  if (player_health == 0 || enemy_health == 0) return
  playGame("scissors")
})
