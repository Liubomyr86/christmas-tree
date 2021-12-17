import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';
import { selectData } from '../../../utils/selectData';

class Sorting extends BaseElement {
  select: HTMLElement;
  option: HTMLElement | undefined;
  constructor() {
    super('div', ['sort']);
    new Title('h2', ['controls__title'], 'Sorting').render(this.element);
    this.select = new BaseElement('select', ['sort__select']).render(
      this.element
    );
    selectData.forEach((item) => {
      this.option = new BaseElement(
        'option',
        ['select__option'],
        item.name
      ).render(this.select);
      this.option.setAttribute('value', item.value);
    });
  }
}

export default Sorting;
