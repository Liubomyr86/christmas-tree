import './_search.scss';
import BaseElement from '../../../components/BaseElement';

class Search extends BaseElement {
  setData: () => void;
  private searchValue: string = '';
  checkSearchValue() {
    return this.searchValue;
  }

  resetSearchValue() {
    this.searchValue = '';
    return ((<HTMLInputElement>this.element).value = '');
  }

  constructor(setData: () => void) {
    super('input', ['search']);
    this.element.setAttribute('type', 'search');
    this.element.setAttribute('autocomplete', 'off');
    this.element.setAttribute('placeholder', 'Search toys by name...');
    this.element.id = 'search';
    this.setData = setData;
    this.searchCard();
  }

  searchCard() {
    this.element.addEventListener('input', (event) => {
      this.searchValue = (<HTMLInputElement>event.target).value
        .toLowerCase()
        .trim();
      this.setData();
    });
  }
}

export default Search;
