"use strict"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

const sprites = [
  {size: [432, 240], src: "Images/Frogs/ToxicFrogBlueBlue_Sheet.png"},
  {size: [432, 240], src: "Images/Frogs/ToxicFrogBlueBrown_Sheet.png"},
  {size: [432, 240], src: "Images/Frogs/ToxicFrogGreenBlue_Sheet.png"},
  {size: [432, 240], src: "Images/Frogs/ToxicFrogGreenBrown_Sheet.png"},
  {size: [432, 240], src: "Images/Frogs/ToxicFrogPurpleBlue_Sheet.png"},
  {size: [432, 240], src: "Images/Frogs/ToxicFrogPurpleWhite_Sheet.png"}
]

const frog_player_id = 0
const frog_player = new Image(sprites[frog_player_id].size[0], sprites[frog_player_id].size[1])
frog_player.src = sprites[frog_player_id].src

const frog_enemy_id = 3
const frog_enemy = new Image(sprites[frog_enemy_id].size[0], sprites[frog_enemy_id].size[1])
frog_enemy.src = sprites[frog_enemy_id].src

const idle = { row: 0, max_column: 8 }
const attack = { row:2, max_column: 6 }
const hit = { row: 3, max_column: 4 }
const death = { row: 4, max_column: 9 }

const frameWidth = 48
const frameHeight = 48

let animation_timer = null
startAnimation(idle)

function startAnimation(animation) {
  let currentFrame = 0
  let currentAnimation = animation

  clearInterval(animation_timer)

  animation_timer = setInterval(function () {
    currentFrame++

    // Make the frames loop
    let maxFrame = currentAnimation.max_column
    if (currentFrame > maxFrame) currentFrame = 0

    // Update rows and columns
    let column = currentFrame % currentAnimation.max_column
    let row = currentAnimation.row

    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(frog_player, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 0, 0, frameWidth * 3, frameHeight * 3)

    ctx.translate(240, 0);
    ctx.scale(-1,1);
    ctx.drawImage(frog_enemy, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 0, 0, frameWidth * 3, frameHeight * 3);
    ctx.setTransform(1,0,0,1,0,0);
  }, 100)
}
