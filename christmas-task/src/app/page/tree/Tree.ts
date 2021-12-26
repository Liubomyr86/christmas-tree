import './_tree.scss';

import BaseElement from '../../components/BaseElement';
import PlaySound from './PlaySound/PlaySound';
import Snowflaks from './Snowflaks/Snowflaks';
import { treeData } from '../../utils/treeData';
import ChooseTree from './ChooseTree/ChooseTree';

class TreePage extends BaseElement {
  audioSnowflaks: HTMLElement;
  playSound: HTMLElement;
  snowflaks: HTMLElement;
  chooseTree: HTMLElement;
  chooseBackground: HTMLElement;

  constructor() {
    super('main', ['main']);
    this.element.innerHTML = `
      <div class="blur">
        <div class="tree container">
          <div class="tree__settings">
            <div class="tree__audio-snowflaks"></div>
            <div class="tree__choose-tree">
              <h2 class="tree__title">Choose tree</h2>
              <div class="tree__items-container"></div>
            </div>
            <div class="tree__choose-background">
              <h2 class="tree__title">Choose background</h2>
              <div class="tree__items-bg-container"></div>
            </div>
            <div class="tree__choose-garland">
              <h2 class="tree__title">Garland</h2>
            </div>
          </div>
          <div class="tree__container"></div>
          <div class="tree__toys"></div>
        </div>
      </div>
    `;
    this.audioSnowflaks = this.element.querySelector('.tree__audio-snowflaks')!;
    this.chooseTree = this.element.querySelector('.tree__items-container')!;
    this.chooseBackground = this.element.querySelector(
      '.tree__items-bg-container'
    )!;

    this.playSound = new PlaySound().render(this.audioSnowflaks);
    this.snowflaks = new Snowflaks().render(this.audioSnowflaks);
    treeData.forEach((item) => new ChooseTree(item).render(this.chooseTree));
  }
}

export default TreePage;
