"use strict"

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

const player_healthbar = document.querySelector(".healthbar.player")
const player = new Frog(ctx, true, getRandomInt(6))
let player_health = 5;

const enemy_healthbar = document.querySelector(".healthbar.enemy")
const enemy = new Frog(ctx, false, getRandomInt(6))
let enemy_health = 5;

player.startAnimation(Frog.animations.idle)
enemy.startAnimation(Frog.animations.idle)

mainLoop()

function mainLoop() {
  setInterval(() => {
    player.nextFrame()
    enemy.nextFrame()

    // draw
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (player.animation.name == "hit") {
      player.draw()
      enemy.draw()
    } else {
      enemy.draw()
      player.draw()
    }
  }, 100)
}

function playerGotHit() {
  setTimeout(() => {
    setTimeout(() => {
      player.startAnimation(Frog.animations.hit)
      croak.play()

      player_health--
      player_healthbar.src = `images/health-bar/health-bar-${player_health}.png`

      if (player_health == 0) {
        player.startAnimation(Frog.animations.death)
        
        setTimeout(() => {
          puff.play()
          result_info.showResultInfo(false)
        }, 300)

        setTimeout(() => {
          background_loop.stop()
          lose_melody.play()
        }, 1000)
      }
    }, 300)

    enemy.startAnimation(Frog.animations.attack)
  }, 1750)
}

function enemyGotHit() {
  setTimeout(() => {
    player.startAnimation(Frog.animations.attack)

    setTimeout(() => {
      enemy.startAnimation(Frog.animations.hit)
      croak.play()

      enemy_health--
      enemy_healthbar.src = `images/health-bar/health-bar-${enemy_health}.png`

      if (enemy_health == 0) {
        enemy.startAnimation(Frog.animations.death)

        setTimeout(() => {
          result_info.showResultInfo(true)
          puff.play()
        }, 300)

        setTimeout(() => {
          background_loop.stop()
          win_melody.play()
        }, 1000)
      }
    }, 300)
  }, 1750)
}
