import './_search.scss';
import BaseElement from '../../../components/BaseElement';
import { IToyCardData } from '../../../utils/alias';
import ToyCard from '../ToyCard/ToyCard';

class Search extends BaseElement {
  data: (IToyCardData | undefined)[];
  setData: (data: (IToyCardData | undefined)[]) => void;
  constructor(
    filterData: (IToyCardData | undefined)[],
    setData: (data: (IToyCardData | undefined)[]) => void
  ) {
    super('input', ['search']);
    this.element.setAttribute('type', 'search');
    this.element.setAttribute('autocomplete', 'off');
    this.element.id = 'search';
    this.searchCard();

    this.data = filterData;
    this.setData = setData;
  }

  searchCard() {
    this.element.addEventListener('input', (event) => {
      let value = (<HTMLInputElement>event.target).value.trim();

      if (value !== '') {
        const newFilterData = this.data.filter((item) => {
          if (item!.name.toLowerCase().search(value) !== -1) {
            return item;
          }
        });
        this.setData(newFilterData);

        const cardsContainer = document.body.querySelector(
          '.toys__cards-container'
        );
        if (cardsContainer) cardsContainer.innerHTML = '';
        newFilterData.forEach((item) => {
          if (item) return cardsContainer?.append(new ToyCard(item).element);
        });
      } else {
        const cardsContainer = document.body.querySelector(
          '.toys__cards-container'
        );
        if (cardsContainer) cardsContainer.innerHTML = '';
        this.data.forEach((item) => {
          if (item) return cardsContainer?.append(new ToyCard(item).element);
        });
      }
    });
  }
}

export default Search;
