import './_search.scss';
import BaseElement from '../../../components/BaseElement';

class Search extends BaseElement {
  setData: (name: string) => void;

  constructor(setData: (name: string) => void) {
    super('input', ['search']);
    this.element.setAttribute('type', 'search');
    this.element.setAttribute('autocomplete', 'off');
    this.element.id = 'search';
    this.setData = setData;
    this.searchCard();
  }

  searchCard() {
    this.element.addEventListener('input', (event) => {
      let value = (<HTMLInputElement>event.target).value.toLowerCase().trim();
      this.setData(value);
    });
  }
}

export default Search;
