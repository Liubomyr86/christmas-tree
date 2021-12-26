import './_tree.scss';

import BaseElement from '../../components/BaseElement';
import PlaySound from './PlaySound/PlaySound';
import Snowflaks from './Snowflaks/Snowflaks';

class TreePage extends BaseElement {
  audioSnowflaks: HTMLElement;
  playSound: HTMLElement;
  snowflaks: HTMLElement;

  constructor() {
    super('main', ['main']);
    this.element.innerHTML = `
      <div class="blur">
        <div class="tree container">
          <div class="tree__settings">
            <div class="tree__audio-snowflaks"></div>
            <div class="tree__choose-tree"></div>
            <div class="tree__choose-background"></div>
            <div class="tree__choose-garland"></div>
          </div>
          <div class="tree__container"></div>
          <div class="tree__toys"></div>
        </div>
      </div>
    `;
    this.audioSnowflaks = this.element.querySelector('.tree__audio-snowflaks')!;

    this.playSound = new PlaySound().render(this.audioSnowflaks);
    this.snowflaks = new Snowflaks().render(this.audioSnowflaks);
  }
}

export default TreePage;
