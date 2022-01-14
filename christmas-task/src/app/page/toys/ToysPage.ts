import './_toys-page.scss';

import data from '../../utils/data';
import BaseElement from '../../components/BaseElement';
import RangeFilters from './RangeFilters/RangeFilters';
import ValueFilters from './ValueFilters/ValueFilters';
import Search from './Search/Search';
import Sorting from './Sort/Sorting';
import ToyCard from './ToyCard/ToyCard';
import { IToyCardData } from '../../utils/alias';
import FavoriteFilter from './ValueFilters/FavoriteFilter/FavoriteFilter';

class ToysPage extends BaseElement {
  filterData: (IToyCardData | undefined)[];

  private controls: HTMLElement;
  private cardsContainer: HTMLElement;
  private toyCards: ToyCard[] = [];

  private valueFilters: ValueFilters;
  private searchElement: Search;
  private favoriteContainer: FavoriteFilter;
  private rangeFilters: RangeFilters;
  private sorting: Sorting;
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
    this.favoriteContainer = new FavoriteFilter(
      this.setValueFilters.bind(this)
    );
    this.favoriteContainer.render(this.controls);

    this.rangeFilters = new RangeFilters(this.setValueFilters.bind(this));
    this.rangeFilters.render(this.controls);
    this.sorting = new Sorting(this.setValueFilters.bind(this));
    this.sorting.render(this.controls);

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
          +item.data.year <= this.rangeFilters.checkYearValues()[1] &&
          this.favoriteContainer.checkFavoriteValue(item.data.favorite)
        );
      })
      .sort(this.sortType('sort-name-max'))
      .forEach((item) => {
        this.cardsContainer.append(item.element);
      });
  }

  sortType(sort: string): ((a: ToyCard, b: ToyCard) => number) | undefined {
    switch (sort) {
      case 'sort-name-max':
        return (a: ToyCard, b: ToyCard) => {
          if (a.data.name > b.data.name) {
            return 1;
          }
          if (a.data.name < b.data.name) {
            return -1;
          }
          return 0;
        };

      case 'sort-name-min':
        return (a: ToyCard, b: ToyCard) => {
          if (a.data.name > b.data.name) {
            return -1;
          }
          if (a.data.name < b.data.name) {
            return 1;
          }
          return 0;
        };

      case 'sort-year-max':
        return (a: ToyCard, b: ToyCard) => {
          if (a.data.year < b.data.year) {
            return 1;
          }
          if (a.data.year > b.data.year) {
            return -1;
          }
          return 0;
        };

      case 'sort-year-min':
        return (a: ToyCard, b: ToyCard) => {
          if (a.data.year < b.data.year) {
            return -1;
          }
          if (a.data.year > b.data.year) {
            return 1;
          }
          return 0;
        };

      default:
        break;
    }
  }
}
export default ToysPage;
