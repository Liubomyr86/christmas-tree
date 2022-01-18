import './_play-sound.scss';

import BaseElement from '../../../components/BaseElement';
import { storage } from '../../../utils/global';

class PlaySound extends BaseElement {
  isPlay: boolean = false;
  audio: HTMLAudioElement;

  constructor() {
    super('span', ['play-sound']);
    this.audio = new Audio('public/audio/audio.mp3');
    this.playSound();
    this.getIsPlayFromLocalStroage();
  }

  playSound() {
    this.element.addEventListener('click', () => {
      if (!this.isPlay) {
        this.audio.play();
        this.audio.loop = true;
        this.isPlay = true;
        this.element.classList.toggle('play-sound_active');
      } else {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlay = false;
        this.element.classList.toggle('play-sound_active');
      }
      storage.setItemToLocalStorage('ct-isPlay', this.isPlay.toString());
    });
  }

  getIsPlayFromLocalStroage() {
    const flag: boolean = JSON.parse(
      storage.getItemFromLocalStorage('ct-isPlay')!
    );
    if (flag) {
      this.audio.play();
      this.isPlay = flag;
      this.element.classList.toggle('play-sound_active');
    } else {
      this.audio.currentTime = 0;
      this.isPlay = false;
    }
  }
}

export default PlaySound;
