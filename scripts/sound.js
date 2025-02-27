"use strict";

var sound = new Howl({
  src: ['Sounds/background_music.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.5
});

sound.play()