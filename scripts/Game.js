"use strict"

class Game {
  background_loop = new Howl({ src: ["sounds/background_music.mp3"], autoplay: true, loop: true })
  win_melody = new Howl({ src: ["sounds/win_melody.ogg"], volume: 1 })
  lose_melody = new Howl({ src: ["sounds/bell.wav"], volume: 1 })

  attack_info = new AttackInfo()
  result_info = new ResultInfo()

  canvas = document.getElementById("canvas")

  constructor() {
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false

    // prepare player
    this.player_healthbar = document.querySelector(".healthbar.player")
    this.player = new Frog(this.ctx, true, getRandomInt(6))

    // prepare enemy
    this.enemy_healthbar = document.querySelector(".healthbar.enemy")
    this.enemy = new Frog(this.ctx, false, getRandomInt(6))

    // start animation
    this.background_loop.play()
    this.player.startAnimation(Frog.animations.idle)
    this.enemy.startAnimation(Frog.animations.idle)
    this.mainLoop()

    // activate choice buttons
    this.rock_button = document.querySelector(".rock")
    this.rock_button.addEventListener("click", this.playRock.bind(this))

    this.paper_button = document.querySelector(".paper")
    this.paper_button.addEventListener("click", this.playPaper.bind(this))

    this.scissors_button = document.querySelector(".scissors")
    this.scissors_button.addEventListener("click", this.playScissors.bind(this))
  }

  mainLoop() {
    setInterval(() => {
      this.player.nextFrame()
      this.enemy.nextFrame()

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      if (this.player.animation.name == "hit") {
        this.player.draw()
        this.enemy.draw()
      } else {
        this.enemy.draw()
        this.player.draw()
      }
    }, 100)
  }

  playRock() {
    if (this.player.health == 0 || this.enemy.health == 0) return
    this.playGame("rock")
  }

  playPaper() {
    if (this.player.health == 0 || this.enemy.health == 0) {
      this.result_info.hideResultInfo()
      this.resetGame()
      return
    }

    this.playGame("paper")
  }

  playScissors() {
    if (this.player.health == 0 || this.enemy.health == 0) return
    this.playGame("scissors")
  }

  resetGame() {
    // reset player
    this.player.health = 5
    this.player_healthbar.src = `images/health-bar/health-bar-${this.player.health}.png`
    this.player.startAnimation(Frog.animations.idle)

    // reset enemy
    this.enemy.health = 5
    this.enemy_healthbar.src = `images/health-bar/health-bar-${this.enemy.health}.png`
    this.enemy.startAnimation(Frog.animations.idle)

    // reset sound
    this.win_melody.stop()
    this.lose_melody.stop()
    this.background_loop.play()
  }

  playerGotHit() {
    setTimeout(() => {
      this.enemy.startAnimation(Frog.animations.attack)

      setTimeout(() => {
        this.player.startAnimation(Frog.animations.hit)
        this.player.croak_sound.play()

        this.player.health--
        this.player_healthbar.src = `images/health-bar/health-bar-${this.player.health}.png`

        if (this.player.health == 0) {
          this.player.startAnimation(Frog.animations.death)

          setTimeout(() => {
            this.player.puff_sound.play()
            this.result_info.showResultInfo(false)
          }, 300)

          setTimeout(() => {
            this.background_loop.stop()
            this.lose_melody.play()
          }, 1000)
        }
      }, 300)
    }, 1750)
  }

  enemyGotHit() {
    setTimeout(() => {
      this.player.startAnimation(Frog.animations.attack)

      setTimeout(() => {
        this.enemy.startAnimation(Frog.animations.hit)
        this.enemy.croak_sound.play()

        this.enemy.health--
        this.enemy_healthbar.src = `images/health-bar/health-bar-${this.enemy.health}.png`

        if (this.enemy.health == 0) {
          this.enemy.startAnimation(Frog.animations.death)

          setTimeout(() => {
            this.enemy.puff_sound.play()
            this.result_info.showResultInfo(true)
          }, 300)

          setTimeout(() => {
            this.background_loop.stop()
            this.win_melody.play()
          }, 1000)
        }
      }, 300)
    }, 1750)
  }

  getComputerChoice() {
    switch (getRandomInt(3)) {
      case 0: return "rock"
      case 1: return "paper"
      case 2: return "scissors"
    }
  }

  playRound(player_choice, computer_choice) {
    const options = ["rock", "paper", "scissors"]

    const player = options.indexOf(player_choice)
    const computer = options.indexOf(computer_choice)

    const winArray = [
      [0, -1, 1], // rock - [rock, paper, sscissors]
      [1, 0, -1], // paper - [rock, paper, sscissors]
      [-1, 1, 0], // sscissors - [rock, paper, sscissors]
    ]

    return winArray[player][computer]
  }

  playGame(player_choice) {
    this.temporarilyDisableButtons()

    const computer_choice = this.getComputerChoice()
    const result = this.playRound(player_choice, computer_choice)

    this.attack_info.showAttackInfo(player_choice, computer_choice, result)

    switch (result) {
      case -1: this.playerGotHit(); break
      case 1: this.enemyGotHit(); break
    }
  }

  temporarilyDisableButtons() {
    this.rock_button.disabled = true
    this.paper_button.disabled = true
    this.scissors_button.disabled = true

    setTimeout(() => {
      this.rock_button.disabled = null
      this.paper_button.disabled = null
      this.scissors_button.disabled = null
    }, 3000)
  }
}
