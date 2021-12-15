import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';

class RangeFilters extends BaseElement {
  title: HTMLElement;
  countContainer: HTMLElement;
  yearContainer: HTMLElement;

  constructor() {
    super('div', ['range']);
    this.title = new Title('h2', ['controls__title'], 'RANGE FILTERS').render();
    this.element.append(this.title);

    this.countContainer = new BaseElement('div', ['count']).render();
    this.countContainer.append(
      new Title('h3', ['controls__subtitle'], 'Number of copies:').render()
    );

    this.yearContainer = new BaseElement('div', ['year']).render();
    this.yearContainer.append(
      new Title('h3', ['controls__subtitle'], 'Purchase year:').render()
    );

    this.element.append(this.countContainer);
    this.element.append(this.yearContainer);
  }
}

export default RangeFilters;
