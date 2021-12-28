import './_tree.scss';

import BaseElement from '../../components/BaseElement';
import PlaySound from './PlaySound/PlaySound';
import Snowflaks from './Snowflaks/Snowflaks';
import { treeData } from '../../utils/treeData';
import ChooseTree from './ChooseTree/ChooseTree';
import { backgroundData } from '../../utils/backgroundData';
import ChooseBackground from './ChooseBackground/ChooseBackground';
import { garlandData } from '../../utils/garlandData';
import ChooseGarland from './ChoseGarland/ChooseGarland';
import GarlandToggle from './GarlandToggle/GarlandToggle';
import { IToyCardData } from '../../utils/alias';
import { state } from '../../utils/global';
import data from '../../utils/data';
import FavoriteToy from './TreeToy/FavoriteToy';
import MainTree from './MainTree/MainTree';

class TreePage extends BaseElement {
  audioSnowflaks: HTMLElement;
  playSound: HTMLElement;
  snowflaks: HTMLElement;
  chooseTree: HTMLElement;
  chooseBackground: HTMLElement;
  chooseGarland: HTMLElement;
  garlandButtonsContainer: any;
  toggleGarland: HTMLElement;
  treeToysContainer: HTMLElement;
  favotiteToysData: IToyCardData[];
  mainTreeContainer: HTMLElement;
  mainTree: HTMLElement;

  constructor() {
    super('main', ['main']);
    this.favotiteToysData = [];
    this.getFavoriteToy();
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
              <div class="tree__garland-container">
                <div class="tree__garland-buttons"></div>
              </div>
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
    this.chooseGarland = this.element.querySelector(
      '.tree__garland-container'
    )!;
    this.garlandButtonsContainer = this.element.querySelector(
      '.tree__garland-buttons'
    )!;
    this.mainTreeContainer = this.element.querySelector('.tree__container')!;
    this.treeToysContainer = this.element.querySelector('.tree__toys')!;

    this.playSound = new PlaySound().render(this.audioSnowflaks);
    this.snowflaks = new Snowflaks().render(this.audioSnowflaks);
    treeData.forEach((item) => new ChooseTree(item).render(this.chooseTree));
    backgroundData.forEach((item) =>
      new ChooseBackground(item).render(this.chooseBackground)
    );
    garlandData.forEach((item) =>
      new ChooseGarland(item).render(this.garlandButtonsContainer)
    );
    this.toggleGarland = new GarlandToggle().render(this.chooseGarland);
    this.mainTree = new MainTree().render(this.mainTreeContainer);
    this.favotiteToysData.forEach((item) => {
      new FavoriteToy(item).render(this.treeToysContainer);
    });
  }

  getFavoriteToy() {
    if (state.getArrayLength() <= 0) {
      return (this.favotiteToysData = data.slice(0, 20));
    } else {
      return (this.favotiteToysData = state.getArrayItems(
        this.favotiteToysData
      ));
    }
  }
}

export default TreePage;
