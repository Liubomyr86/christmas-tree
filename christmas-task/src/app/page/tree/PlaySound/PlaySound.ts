import './_play-sound.scss';

import BaseElement from '../../../components/BaseElement';

class PlaySound extends BaseElement {
  isPlay: boolean = false;
  audio: HTMLAudioElement;

  constructor() {
    super('span', ['play-sound']);
    this.audio = new Audio('public/audio/audio.mp3');
    this.playSound();
  }

  playSound() {
    this.element.addEventListener('click', () => {
      if (!this.isPlay) {
        this.audio.play();
        this.isPlay = true;
        this.element.classList.toggle('play-sound_active');
      } else {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlay = false;
        this.element.classList.toggle('play-sound_active');
      }
    });
  }
}

export default PlaySound;
