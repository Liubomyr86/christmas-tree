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
import { state, storage } from '../../utils/global';

class ToysPage extends BaseElement {
  filterData: (IToyCardData | undefined)[];

  private controls: HTMLElement;
  private cardsContainer: HTMLElement;
  private toyCards: ToyCard[] = [];

  private valueFilters: ValueFilters;
  private searchElement: Search;
  private favoriteFilter: FavoriteFilter;
  private rangeFilters: RangeFilters;
  private sorting: Sorting;
  private resetButton: HTMLElement;

  constructor(callback: () => void) {
    super('div', ['blur']);

    this.filterData = this.getData();
    this.element.innerHTML = `
      <div class="toys container">
        <div class="toys__controls controls"></div>
        <div class="toys__cards-container"></div>
      </div>
    `;

    this.controls = this.element.querySelector('.toys__controls')!;
    this.cardsContainer = this.element.querySelector('.toys__cards-container')!;

    this.searchElement = new Search(this.setValueFilters.bind(this));
    this.searchElement.render(this.controls);
    this.valueFilters = new ValueFilters(this.setValueFilters.bind(this));
    this.valueFilters.render(this.controls);
    this.favoriteFilter = new FavoriteFilter(this.setValueFilters.bind(this));
    this.favoriteFilter.render(this.controls);

    this.rangeFilters = new RangeFilters(this.setValueFilters.bind(this));
    this.rangeFilters.render(this.controls);
    this.sorting = new Sorting(this.setValueFilters.bind(this));
    this.sorting.render(this.controls);

    this.resetButton = new BaseElement(
      'button',
      ['reset'],
      'Reset filters'
    ).render(this.controls);

    this.toyCards = data.map((item) => new ToyCard(item, callback));
    this.setValueFilters();
    this.resetFiltersValues();
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
          this.favoriteFilter.checkFavoriteValue(item.data.favorite)
        );
      })
      .sort(this.sortType.bind(this))
      .forEach((item) => {
        const favoriteCards = state.getArrayItems();
        favoriteCards.forEach((card) => {
          if (card.num === item.data.num) {
            item.ribbon.classList.add('ribbon_checked');
          }
        });
        this.cardsContainer.append(item.element);
      });

    if (!this.cardsContainer.childNodes.length) {
      this.cardsContainer.textContent = 'No matches found';
    }
  }

  sortType(a: ToyCard, b: ToyCard): number {
    switch (this.sorting.checkSortType()) {
      case 'sort-name-max':
        if (a.data.name > b.data.name) {
          return 1;
        }
        if (a.data.name < b.data.name) {
          return -1;
        }
        return 0;

      case 'sort-name-min':
        if (a.data.name > b.data.name) {
          return -1;
        }
        if (a.data.name < b.data.name) {
          return 1;
        }
        return 0;

      case 'sort-year-max':
        if (a.data.year < b.data.year) {
          return 1;
        }
        if (a.data.year > b.data.year) {
          return -1;
        }
        return 0;

      default:
        if (a.data.year < b.data.year) {
          return -1;
        }
        if (a.data.year > b.data.year) {
          return 1;
        }
        return 0;
    }
  }

  resetFiltersValues() {
    this.resetButton.addEventListener('click', () => {
      const sortType = this.sorting.checkSortType();
      storage.clearLocalStorage();
      storage.setItemToLocalStorage('ct-sort', sortType);
      this.cardsContainer.innerHTML = '';
      this.searchElement.resetSearchValue();
      this.valueFilters.clearSet();
      this.valueFilters.resetStyles();
      this.favoriteFilter.resetFavoritButton();
      this.rangeFilters.resetCountValues();
      this.rangeFilters.resetYearValues();
      this.toyCards
        .sort(this.sortType.bind(this))
        .forEach((item) => this.cardsContainer.append(item.element));
    });
  }
}
export default ToysPage;
