"use strict"

class Action {
  constructor() {
    this.container = document.querySelector(".action.attack")

    this.left = {
      container: this.container.querySelector(".left"),
      text: this.container.querySelector(".left .text"),
      top: this.container.querySelector(".left .top"),
      bot: this.container.querySelector(".left .bot"),
    }

    this.right = {
      container: this.container.querySelector(".right"),
      text: this.container.querySelector(".right .text"),
      top: this.container.querySelector(".right .top"),
      bot: this.container.querySelector(".right .bot"),
    }
  }

  showAction(player_pick, enemy_pick, result) {
    this.left.text.textContent = player_pick
    this.left.top.textContent = player_pick
    this.left.bot.textContent = player_pick

    this.right.text.textContent = enemy_pick
    this.right.top.textContent = enemy_pick
    this.right.bot.textContent = enemy_pick

    this.left.container.classList.remove("cut")
    this.right.container.classList.remove("cut")

    // prettier-ignore
    switch (result) {
      case -1: this.left.container.classList.add("cut"); break
      case 1: this.right.container.classList.add("cut"); break
    }

    this.container.hidden = null
    setTimeout(() => (this.container.hidden = true), 3000)
  }
}
