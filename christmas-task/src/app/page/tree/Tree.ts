import './_tree.scss';

import BaseElement from '../../components/BaseElement';
import PlaySound from './PlaySound/PlaySound';
import SnowflakeButton from './SnowflakeButton/SnowflakeButton';
import { treeData } from '../../utils/treeData';
import ChooseTree from './ChooseTree/ChooseTree';
import { backgroundData } from '../../utils/backgroundData';
import ChooseBackground from './ChooseBackground/ChooseBackground';
import { garlandButtonData } from '../../utils/garlandData';
import GarlandButtons from './GarlandButtons/GarlandButtons';
import GarlandToggle from './GarlandToggle/GarlandToggle';
import { IToyCardData } from '../../utils/alias';
import { state, storage } from '../../utils/global';
import data from '../../utils/data';
import FavoriteToy from './TreeToy/FavoriteToy';
import MainTree from './MainTree/MainTree';
import Snowflakes from './Snowflakes/Snowflakes';
import GarlandTree from './GarlandTree/GarlandTree';
import Hamburger from './Hamburger/Hamburger';

class TreePage extends BaseElement {
  hamburgerContainer: HTMLElement;
  hamburger: Hamburger;
  treeSettings: HTMLElement;
  audioSnowflaks: HTMLElement;
  playSound: PlaySound;
  snowflakes: Snowflakes;
  chooseTree: HTMLElement;
  chooseBackground: HTMLElement;
  chooseGarland: HTMLElement;
  garlandButtonsContainer: HTMLElement;
  toggleGarland: GarlandToggle;
  treeToysContainer: HTMLElement;
  favotiteToysData: IToyCardData[] = [];
  mainTreeContainer: HTMLElement;
  mainTree: HTMLElement;
  snowflakesContainer: HTMLElement;
  garlandTreeContainer: HTMLElement;

  garlandColor: string = 'multicolor';
  isChecked = false;

  dragX = 0;
  dragY = 0;
  snowflaksButton: HTMLElement;
  tree: MainTree;
  garland: GarlandTree;

  constructor() {
    super('div', ['blur']);
    this.getFavoriteToy();

    this.element.innerHTML = `
      <div class="tree container">
        <span class="hamburger"></span>
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
        <div class="tree__container">
          <div class="tree__snowflakes"></div>
          <div class="tree__garland garland"></div>
          <div class="tree__main-tree"></div>
        </div>
        <div class="tree__toys">
          <h2 class="tree__title">Toys</h2>
          <div class="tree__toys-container"></div>
        </div>
      </div>
    `;

    this.hamburgerContainer = this.element.querySelector('.hamburger')!;
    this.treeSettings = this.element.querySelector('.tree__settings')!;
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
    this.mainTree = this.element.querySelector('.tree__main-tree')!;
    this.treeToysContainer = this.element.querySelector(
      '.tree__toys-container'
    )!;
    this.garlandTreeContainer = this.element.querySelector('.tree__garland')!;
    this.snowflakesContainer = this.element.querySelector('.tree__snowflakes')!;

    this.snowflakes = new Snowflakes(50);
    this.garland = new GarlandTree();
    this.tree = new MainTree(this.getCoordinatesForToy.bind(this));

    this.hamburger = new Hamburger(this.treeSettings);
    this.hamburger.render(this.hamburgerContainer);

    this.playSound = new PlaySound();
    this.playSound.render(this.audioSnowflaks);
    this.snowflaksButton = new SnowflakeButton(
      this.snowflakes.setClassName.bind(this.snowflakes)
    ).render(this.audioSnowflaks);
    treeData.forEach((item) =>
      new ChooseTree(item, this.changeTreeSrc.bind(this)).render(
        this.chooseTree
      )
    );
    backgroundData.forEach((item) =>
      new ChooseBackground(item, this.changeBackgroundUrl.bind(this)).render(
        this.chooseBackground
      )
    );
    garlandButtonData.forEach((item) =>
      new GarlandButtons(item, this.garlandOn.bind(this)).render(
        this.garlandButtonsContainer
      )
    );
    this.toggleGarland = new GarlandToggle(
      this.garland.swithGarland.bind(this.garland)
    );
    this.toggleGarland.render(this.chooseGarland);

    this.snowflakes.render(this.snowflakesContainer);
    this.garlandTreeContainer.append(this.garland.element);
    this.mainTree.append(this.tree.element);

    this.favotiteToysData.forEach((item) => {
      new FavoriteToy(item, this.setCoordinatesForToy.bind(this)).render(
        this.treeToysContainer
      );
    });

    this.changeBackgroundUrl('public/bg/1.jpg');
    this.getTreeBgFromLocalStorage();
  }

  getFavoriteToy() {
    if (state.getArrayLength() <= 0) {
      return (this.favotiteToysData = data.slice(0, 20));
    } else {
      return (this.favotiteToysData = state.getArrayItems());
    }
  }

  setCoordinatesForToy(x: number, y: number) {
    this.dragX = x;
    this.dragY = y;
  }

  getCoordinatesForToy() {
    const coordinates = [this.dragX, this.dragY];
    return coordinates;
  }

  changeBackgroundUrl(path: string) {
    this.mainTreeContainer.style.backgroundImage = `url(${path})`;
  }

  changeTreeSrc(src: string) {
    this.tree.changeSrc(src);
  }

  garlandOn(color: string, flag: boolean) {
    this.garland.swithGarland(color, flag);
    this.toggleGarland.garlandColor = color;
    this.toggleGarland.toggleOn(flag);
  }

  getTreeBgFromLocalStorage() {
    if (storage.getItemFromLocalStorage('ct-treeBg')) {
      const bgPath = storage.getItemFromLocalStorage('ct-treeBg')!;
      this.mainTreeContainer.style.backgroundImage = `url(${bgPath})`;
    }
  }

  cleanUp(): void {
    this.playSound.stopPlay();
  }
}

export default TreePage;
