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

  private controls: HTMLElement;
  private cardsContainer: HTMLElement;
  private toyCards: ToyCard[] = [];

  private valueFilters: ValueFilters;
  private searchElement: Search;
  private rangeFilters: RangeFilters;
  private sorting: HTMLElement;
  private resetButton: HTMLElement;

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

    this.controls = this.element.querySelector('.toys__controls')!;
    this.cardsContainer = this.element.querySelector('.toys__cards-container')!;

    this.searchElement = new Search(this.setValueFilters.bind(this));
    this.searchElement.render(this.controls);
    this.valueFilters = new ValueFilters(this.setValueFilters.bind(this));
    this.valueFilters.render(this.controls);
    this.rangeFilters = new RangeFilters(this.setValueFilters.bind(this));
    this.rangeFilters.render(this.controls);
    this.sorting = new Sorting().render(this.controls);

    this.resetButton = new BaseElement(
      'button',
      ['reset'],
      'Reset filters'
    ).render(this.controls);

    this.toyCards = data.map((item) => new ToyCard(item));
    this.setValueFilters();
  }

  getData() {
    const toysData = data;
    return toysData;
  }

  setValueFilters() {
    this.cardsContainer.innerHTML = '';
    this.toyCards
      .filter((item) => {
        return (
          item.data.name
            .toLowerCase()
            .includes(this.searchElement.checkSearchValue()) &&
          this.valueFilters.checkShapeIsSelected(item.data.shape) &&
          this.valueFilters.checkColorIsSelected(item.data.color) &&
          this.valueFilters.checkSizeIsSelected(item.data.size) &&
          +item.data.amount >= this.rangeFilters.checkCountValues()[0] &&
          +item.data.amount <= this.rangeFilters.checkCountValues()[1] &&
          +item.data.year >= this.rangeFilters.checkYearValues()[0] &&
          +item.data.year <= this.rangeFilters.checkYearValues()[1]
        );
      })
      .forEach((item) => {
        this.cardsContainer.append(item.element);
      });
  }
}
export default ToysPage;
