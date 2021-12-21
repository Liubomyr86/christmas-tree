import './_toys-page.scss';

import data from '../../utils/data';
import BaseElement from '../../components/BaseElement';
import RangeFilters from './RangeFilters/RangeFilters';
import ValueFilters from './ValueFilters/ValueFilters';
import Search from './Search/Search';
import Sorting from './Sort/Sorting';
import ToyCard from './ToyCard/ToyCard';
import { IToyCardData } from '../../utils/alias';

class ToysPage extends BaseElement {
  filterData: (IToyCardData | undefined)[];

  private cardsContainer: HTMLElement;
  private toyCards: ToyCard[] = [];

  constructor() {
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
    controls.append(new ValueFilters(this.filterData).element);
    controls.append(new RangeFilters().element);
    controls.append(new Sorting().element);
    controls.append(
      new BaseElement('button', ['reset'], 'Reset filters').element
    );

    this.toyCards = data.map((item) => new ToyCard(item));
    this.setSearchFilter('');
  }

  getData() {
    const toysData = data;

    return toysData;
  }

  setSearchFilter(name: string) {
    console.log(this);
    this.cardsContainer.innerHTML = '';
    this.toyCards
      .filter((item) => item.data.name.toLowerCase().includes(name))
      .forEach((item) => {
        this.cardsContainer.append(item.element);
      });
  }
}

export default ToysPage;
