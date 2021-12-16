import data from '../../utils/data';
import BaseElement from '../../components/BaseElement';
import { IFilterData } from '../../utils/alias';
import RangeFilters from './RangeFilters/RangeFilters';
import ValueFilters from './ValueFilters/ValueFilters';
import Search from './Search/Search';
import Sorting from './Sort/Sorting';

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

    if (!controls) throw Error('Controls element not found');
    controls.append(new Search().element);
    controls.append(new ValueFilters(this.data).element);
    controls.append(new RangeFilters().element);
    controls.append(new Sorting().element);
    controls.append(
      new BaseElement('button', ['reset'], 'Сброс фильтров').element
    );
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
