import './_range-filters.scss';

import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';

class RangeFilters extends BaseElement {
  title: HTMLElement;
  countContainer: HTMLElement;
  yearContainer: HTMLElement;
  countRangeContainer: HTMLElement;
  yearRangeContainer: HTMLElement;

  constructor() {
    super('div', ['range']);
    this.title = new Title('h2', ['controls__title'], 'RANGE FILTERS').render(
      this.element
    );

    this.countContainer = new BaseElement('div', ['count']).render(
      this.element
    );
    new Title('h3', ['controls__subtitle'], 'Number of copies:').render(
      this.countContainer
    );
    this.countRangeContainer = new BaseElement('div', [
      'count__range-container',
    ]).render(this.countContainer);
    new BaseElement('output', ['range__output'], '1').render(
      this.countRangeContainer
    );
    new BaseElement('div', ['count__slider']).render(this.countRangeContainer);
    new BaseElement('output', ['range__output'], '12').render(
      this.countRangeContainer
    );

    this.yearContainer = new BaseElement('div', ['year']).render(this.element);
    new Title('h3', ['controls__subtitle'], 'Purchase year:').render(
      this.yearContainer
    );
    this.yearRangeContainer = new BaseElement('div', [
      'year__range-container',
    ]).render(this.yearContainer);
    new BaseElement('output', ['range__output'], '1940').render(
      this.yearRangeContainer
    );
    new BaseElement('div', ['year__slider']).render(this.yearRangeContainer);
    new BaseElement('output', ['range__output'], '2020').render(
      this.yearRangeContainer
    );
  }
}

export default RangeFilters;
