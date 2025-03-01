"use strict"

class Frog {
  static animations = {
    idle:   { name: "idle",   row: 0, max_frame: 8 },
    attack: { name: "attack", row: 2, max_frame: 6 },
    hit:    { name: "hit",    row: 3, max_frame: 4 },
    death:  { name: "death",  row: 4, max_frame: 9 },
    none:   { name: "none",   row: 1, max_frame: 9 },
  }
  
  sprites = [
    { size: [432, 240], src: "Images/Frogs/ToxicFrogBlueBlue_Sheet.png" },
    { size: [432, 240], src: "Images/Frogs/ToxicFrogBlueBrown_Sheet.png" },
    { size: [432, 240], src: "Images/Frogs/ToxicFrogGreenBlue_Sheet.png" },
    { size: [432, 240], src: "Images/Frogs/ToxicFrogGreenBrown_Sheet.png" },
    { size: [432, 240], src: "Images/Frogs/ToxicFrogPurpleBlue_Sheet.png" },
    { size: [432, 240], src: "Images/Frogs/ToxicFrogPurpleWhite_Sheet.png" },
  ]

  frame_width = 48
  frame_height = 48

  animation_stop = true
  animation_frame = 0
  animation = null

  constructor(ctx, is_player, sprite_id) {
    this.ctx = ctx;
    this.is_player = is_player
    this.sprite_id = sprite_id

    this.frog_img = new Image(...this.sprites[this.sprite_id].size)
    this.frog_img.src =this.sprites[this.sprite_id].src
  }

  startAnimation(animation) {
    this.animation_stop = false
    this.animation_frame = 0
    this.animation = animation
  }
  
  nextFrame() {
    this.animation_frame++
  
    if (this.animation_frame >= this.animation.max_frame) {
      if (["attack", "hit"].includes(this.animation.name)) this.animation = Frog.animations.idle
      if (this.animation.name == "death") this.animation_stop = true
      
      this.animation_frame = 0
    }
  
    this.col = this.animation_stop ? 8 : this.animation_frame
    this.row = this.animation_stop ? 3 : this.animation.row
  }
  
  draw() {
    if (!this.is_player) {
      this.ctx.translate(230, 0)
      this.ctx.scale(-1, 1)
    }

    this.ctx.drawImage(
      this.frog_img, 
      this.col * this.frame_width, 
      this.row * this.frame_height, 
      this.frame_width, 
      this.frame_height, 
      0, 
      0, 
      this.frame_width * 3, 
      this.frame_height * 3
    )

    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}