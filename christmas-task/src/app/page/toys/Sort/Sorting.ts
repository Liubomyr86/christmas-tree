import './_sort.scss';

import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';
import { selectData } from '../../../utils/selectData';
import { storage } from '../../../utils/global';

class Sorting extends BaseElement {
  select: HTMLElement;
  option: HTMLElement | undefined;

  sortFilter: () => void;

  private sortType: string = 'sort-name-max';
  checkSortType() {
    return this.sortType;
  }

  constructor(setSort: () => void) {
    super('div', ['sort']);
    this.sortFilter = setSort;

    new Title('h2', ['controls__title'], 'Sorting').render(this.element);
    this.select = new BaseElement('select', ['sort__select']).render(
      this.element
    );
    selectData.forEach((item) => {
      this.option = new BaseElement(
        'option',
        ['sort__option'],
        item.name
      ).render(this.select);
      this.option.setAttribute('value', item.value);
    });
    this.sortType;
    this.getSortValueFromLocalStorage();
    this.setSortType();
  }

  setSortType() {
    this.select.addEventListener('change', (event) => {
      const target = <HTMLOptionElement>event.target;

      switch (target.value) {
        case 'sort-name-max':
          this.sortType = target.value;
          this.sortFilter();
          break;

        case 'sort-name-min':
          this.sortType = target.value;
          this.sortFilter();
          break;

        case 'sort-year-max':
          this.sortType = target.value;
          this.sortFilter();
          break;

        case 'sort-year-min':
          this.sortType = target.value;
          this.sortFilter();
          break;

        default:
          break;
      }
      storage.setItemToLocalStorage('ct-sort', target.value);
    });
  }

  getSortValueFromLocalStorage() {
    if (storage.getItemFromLocalStorage('ct-sort')) {
      const localStorageSortValue = storage.getItemFromLocalStorage('ct-sort');

      this.sortType = localStorageSortValue!;

      const options: Element[] = Array.from(this.select.children);
      for (let option of options) {
        if ((<HTMLOptionElement>option).value === localStorageSortValue) {
          (<HTMLOptionElement>option).selected = true;
        }
      }
    }
  }
}

export default Sorting;
