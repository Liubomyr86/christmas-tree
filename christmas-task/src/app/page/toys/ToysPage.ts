import data from '../../utils/data';
import BaseElement from '../../components/BaseElement';
import { IFilterData } from '../../utils/alias';
import RangeFilters from './RangeFilters/RangeFilters';
import ValueFilters from './ValueFilters/ValueFilters';

class ToysPage extends BaseElement {
  data: IFilterData;

  constructor() {
    super('main', ['main']);

    this.data = this.getToysData();
    this.element.innerHTML = `
      <div class="main__container container">
        <div class="main__controls controls"></div>
        <div class="main__cards-container"></div>
      </div>
    `;

    const controls = this.element.querySelector('.main__controls');
    const cardsContainer = this.element.querySelector('.main__cards-container');

    if (!controls) throw Error('App root element not found');
    controls.append(new ValueFilters(this.data).element);
    controls.append(new RangeFilters().element);
  }

  getToysData() {
    const filterCategories = {
      shape: [...new Set(data.map((item) => item.shape))],
      color: [...new Set(data.map((item) => item.color))],
      size: [...new Set(data.map((item) => item.size))],
    };

    return filterCategories;
  }
}

export default ToysPage;
