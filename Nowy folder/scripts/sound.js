"use strict";

const background_loop = new Howl({
  src: ['Sounds/background_music.mp3'],
  autoplay: true,
  loop: true
});

background_loop.play()

const croak = new Howl({
  src: ['Sounds/croak.mp3'],
  volume: 0.25
});

const puff = new Howl({
  src: ['Sounds/puff.mp3'],
  volume: 1
});

const win_melody = new Howl({
  src: ['Sounds/win_melody.ogg'],
  volume: 1
});

const lose_melody = new Howl({
  src: ['Sounds/bell.wav'],
  volume: 1
});

