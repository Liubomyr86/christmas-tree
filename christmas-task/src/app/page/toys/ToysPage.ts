import './_toys-page.scss';

import data from '../../utils/data';
import BaseElement from '../../components/BaseElement';
import RangeFilters from './RangeFilters/RangeFilters';
import ValueFilters from './ValueFilters/ValueFilters';
import Search from './Search/Search';
import Sorting from './Sort/Sorting';
import ToyCard from './ToyCard/ToyCard';
import { IFilterKeys, IToyCardData } from '../../utils/alias';

class ToysPage extends BaseElement {
  filterData: (IToyCardData | undefined)[];

  private cardsContainer: HTMLElement;
  private toyCards: ToyCard[] = [];
  private curentFilters: ToyCard[] = [];
  private filterKeys: IFilterKeys[] = [];
  private keysSelectedFilter: string[] = [];

  constructor(
    arrPush: (elem: IToyCardData) => void,
    arrPop: (elem: string) => void,
    count: number
  ) {
    super('main', ['main']);

    this.filterData = this.getData();
    this.element.innerHTML = `
      <div class="blur">
        <div class="toys container">
          <div class="toys__controls controls"></div>
          <div class="toys__cards-container"></div>
        </div>
      </div>
    `;

    const controls = this.element.querySelector('.toys__controls');
    this.cardsContainer = this.element.querySelector('.toys__cards-container')!;

    if (!controls) throw Error('Controls element not found');
    controls.append(new Search(this.setSearchFilter.bind(this)).element);
    controls.append(new ValueFilters(this.setValueFilters.bind(this)).element);
    controls.append(new RangeFilters().element);
    controls.append(new Sorting().element);
    controls.append(
      new BaseElement('button', ['reset'], 'Reset filters').element
    );

    this.filterKeys = [
      { shape: 'ball', selected: false },
      { shape: 'figurine', selected: false },
      { shape: 'bell', selected: false },
      { shape: 'cone', selected: false },
      { shape: 'snowflake', selected: false },

      { color: 'yellow', selected: false },
      { color: 'green', selected: false },
      { color: 'white', selected: false },
      { color: 'red', selected: false },
      { color: 'blue', selected: false },

      { size: 'large', selected: false },
      { size: 'average', selected: false },
      { size: 'small', selected: false },
    ];
    this.toyCards = data.map(
      (item) => new ToyCard(item, arrPush, arrPop, count)
    );
    this.setSearchFilter('');
    this.setValueFilters('', '', false);
  }

  getData() {
    const toysData = data;

    return toysData;
  }

  setSearchFilter(name: string) {
    this.cardsContainer.innerHTML = '';
    this.toyCards
      .filter((item) => item.data.name.toLowerCase().includes(name))
      .forEach((item) => {
        this.cardsContainer.append(item.element);
      });
  }

  pushData(category: string, name: string, flag: boolean) {
    switch (category) {
      case 'shape':
        this.filterKeys.forEach((item) => {
          if (item.shape?.includes(name)) item.selected = flag;
        });
        this.filterKeys
          .filter((item) => item.selected)
          .forEach((item) => {
            if (this.keysSelectedFilter.indexOf(item.shape!) === -1)
              this.keysSelectedFilter.push(item.shape!);
          });
        break;
      case 'color':
        this.filterKeys.forEach((item) => {
          if (item.color?.includes(name)) item.selected = flag;
        });
        this.filterKeys
          .filter((item) => item.selected)
          .forEach((item) => {
            if (this.keysSelectedFilter.indexOf(item.color!) === -1)
              this.keysSelectedFilter.push(item.color!);
          });
        break;
      case 'size':
        this.filterKeys.forEach((item) => {
          if (item.size?.includes(name)) item.selected = flag;
        });
        this.filterKeys
          .filter((item) => item.selected)
          .forEach((item) => {
            if (this.keysSelectedFilter.indexOf(item.size!) === -1)
              this.keysSelectedFilter.push(item.size!);
          });
        break;
      default:
        break;
    }
  }

  popData(category: string, name: string, flag: boolean) {
    let i = 0;
    while (i < this.keysSelectedFilter.length) {
      if (this.keysSelectedFilter[i] === name) {
        this.keysSelectedFilter.splice(i, 1);
      } else {
        ++i;
      }
    }
    switch (category) {
      case 'shape':
        this.filterKeys.forEach((item) => {
          if (item.shape?.includes(name)) item.selected = flag;
        });
        break;
      case 'color':
        this.filterKeys.forEach((item) => {
          if (item.color?.includes(name)) item.selected = flag;
        });
        break;
      case 'size':
        this.filterKeys.forEach((item) => {
          if (item.size?.includes(name)) item.selected = flag;
        });
        break;
      default:
        break;
    }
  }

  setValueFilters(category: string, name: string, flag: boolean) {
    console.log(category, name, flag);

    this.cardsContainer.innerHTML = '';
    switch (flag) {
      case true:
        if (!category && !name && this.curentFilters.length === 0) {
          this.toyCards.forEach((item) => {
            this.cardsContainer.append(item.element);
          });
        } else {
          this.pushData(category, name, flag);
          this.curentFilters = this.toyCards.filter((item) => {
            if (
              this.keysSelectedFilter.includes(item.data.shape) ||
              this.keysSelectedFilter.includes(item.data.color) ||
              this.keysSelectedFilter.includes(item.data.size)
            )
              return item;
          });
          this.curentFilters.forEach((item) =>
            this.cardsContainer.append(item.element)
          );
        }
        break;
      case false:
        this.popData(category, name, flag);
        console.log(this.curentFilters);
        if (this.keysSelectedFilter.length === 0) {
          this.toyCards.forEach((item) => {
            this.cardsContainer.append(item.element);
          });
        } else {
          this.curentFilters = this.toyCards.filter((item) => {
            if (
              this.keysSelectedFilter.includes(item.data.shape) ||
              this.keysSelectedFilter.includes(item.data.color) ||
              this.keysSelectedFilter.includes(item.data.size)
            )
              return item;
          });
          this.curentFilters.forEach((item) =>
            this.cardsContainer.append(item.element)
          );
        }

        break;
      default:
        break;
    }
  }
}
export default ToysPage;
