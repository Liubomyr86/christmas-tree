import './_tree.scss';

import BaseElement from '../../components/BaseElement';
import PlaySound from './PlaySound/PlaySound';
import SnowflakeButton from './SnowflakeButton/SnowflakeButton';
import { treeData } from '../../utils/treeData';
import ChooseTree from './ChooseTree/ChooseTree';
import { backgroundData } from '../../utils/backgroundData';
import ChooseBackground from './ChooseBackground/ChooseBackground';
import { garlandButtonData, garlandData } from '../../utils/garlandData';
import GarlandButtons from './GarlandButtons/GarlandButtons';
import GarlandToggle from './GarlandToggle/GarlandToggle';
import { IToyCardData } from '../../utils/alias';
import { state } from '../../utils/global';
import data from '../../utils/data';
import FavoriteToy from './TreeToy/FavoriteToy';
import MainTree from './MainTree/MainTree';
import Snowflakes from './Snowflakes/Snowflakes';
import GarlandTree from './GarlandTree/GarlandTree';

class TreePage extends BaseElement {
  audioSnowflaks: HTMLElement;
  playSound: HTMLElement;
  snowflaks: HTMLElement;
  chooseTree: HTMLElement;
  chooseBackground: HTMLElement;
  chooseGarland: HTMLElement;
  garlandButtonsContainer: any;
  toggleGarland: HTMLElement | undefined;
  treeToysContainer: HTMLElement;
  favotiteToysData: IToyCardData[];
  mainTreeContainer: HTMLElement;
  mainTree: HTMLElement;
  snowflakesContainer: HTMLElement;
  garlandTreeContainer: HTMLElement;

  garlandColor: string = 'multicolor';
  isChecked = false;

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
          <div class="tree__container">
            <div class="tree__garland garland"></div>
          </div>
          <div class="tree__toys">
            <h2 class="tree__title">Toys</h2>
            <div class="tree__toys-container"></div>
          </div>
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
    this.treeToysContainer = this.element.querySelector(
      '.tree__toys-container'
    )!;
    this.garlandTreeContainer = this.element.querySelector('.tree__garland')!;

    this.playSound = new PlaySound().render(this.audioSnowflaks);
    this.snowflaks = new SnowflakeButton().render(this.audioSnowflaks);
    treeData.forEach((item) => new ChooseTree(item).render(this.chooseTree));
    backgroundData.forEach((item) =>
      new ChooseBackground(item).render(this.chooseBackground)
    );
    garlandButtonData.forEach((item) =>
      new GarlandButtons(item, this.garlandOn.bind(this)).render(
        this.garlandButtonsContainer
      )
    );
    this.toggleGarland = new GarlandToggle(
      this.isChecked,
      this.garlandOnOff.bind(this)
    ).render(this.chooseGarland);
    console.dir(this.toggleGarland);
    this.snowflakesContainer = new Snowflakes(50).render(
      this.mainTreeContainer
    );
    this.mainTree = new MainTree().render(this.mainTreeContainer);
    this.favotiteToysData.forEach((item) => {
      new FavoriteToy(item).render(this.treeToysContainer);
    });

    this.changeBackgroundUrl(this.mainTreeContainer);
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

  changeBackgroundUrl(elem: HTMLElement) {
    setInterval(() => {
      elem.style.backgroundImage = `url(${state.getBackgroundUrl()})`;
    }, 100);
  }

  garlandOn(color: string, flag: boolean) {
    this.garlandColor = color;
    this.isChecked = flag;
    this.garlandTreeContainer!.innerHTML = '';
    this.garlandTreeContainer.append(
      new GarlandTree(this.garlandColor, this.isChecked).element
    );
    this.chooseGarland.removeChild(this.chooseGarland.lastChild!);
    this.chooseGarland.append(
      new GarlandToggle(this.isChecked, this.garlandOnOff.bind(this)).element
    );
  }

  garlandOnOff(flag: boolean) {
    this.isChecked = flag;
    this.garlandTreeContainer!.innerHTML = '';
    this.garlandTreeContainer.append(
      new GarlandTree(this.garlandColor, this.isChecked).element
    );
  }
}

export default TreePage;
