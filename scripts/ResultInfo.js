"use strict"

class ResultInfo {
  constructor() {
    this.container = document.querySelector(".action.result")

    this.title = this.container.querySelector(".title")
    this.play_again_info = this.container.querySelector(".play-again-info")
  }

  showResultInfo(win) {
    this.title.style.color = (win) ? "#ffd700" : "red"
    this.title.textContent = (win) ? "You win!" : "You lose!"
    this.container.hidden = null
  }

  hideResultInfo() {
    this.container.hidden = true
  }
}
