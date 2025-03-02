"use strict";

const background_loop = new Howl({
  src: ['sounds/background_music.mp3'],
  autoplay: true,
  loop: true
});

background_loop.play()

const croak = new Howl({
  src: ['sounds/croak.mp3'],
  volume: 0.25
});

const puff = new Howl({
  src: ['sounds/puff.mp3'],
  volume: 1
});

const win_melody = new Howl({
  src: ['sounds/win_melody.ogg'],
  volume: 1
});

const lose_melody = new Howl({
  src: ['sounds/bell.wav'],
  volume: 1
});

