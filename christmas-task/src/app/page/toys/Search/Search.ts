import './_search.scss';
import BaseElement from '../../../components/BaseElement';

class Search extends BaseElement {
  constructor() {
    super('input', ['search']);
    this.element.setAttribute('type', 'search');
    this.element.setAttribute('autocomplete', 'off');
  }
}

export default Search;
