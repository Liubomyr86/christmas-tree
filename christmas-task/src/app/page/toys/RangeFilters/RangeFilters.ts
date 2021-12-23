import 'nouislider/dist/nouislider.css';
import './_range-filters.scss';

import noUiSlider from 'nouislider';
import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';

class RangeFilters extends BaseElement {
  title: HTMLElement;
  countContainer: HTMLElement;
  yearContainer: HTMLElement;
  countRangeContainer: HTMLElement;
  yearRangeContainer: HTMLElement;
  countSliderElement: HTMLElement;
  yearSliderElement: HTMLElement;

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
    this.countSliderElement = new BaseElement('div', ['count__slider']).render(
      this.countRangeContainer
    );
    this.countSliderElement.id = 'count-slider';
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

    this.yearSliderElement = new BaseElement('div', ['year__slider']).render(
      this.yearRangeContainer
    );
    new BaseElement('output', ['range__output'], '2020').render(
      this.yearRangeContainer
    );

    this.countSlider();
    this.yearSlider();
  }

  countSlider() {
    // const snapSlider = document.getElementById('count-slider');
    noUiSlider.create(this.countSliderElement, {
      start: [1, 12],
      snap: true,
      connect: true,
      step: 1,
      range: {
        min: 1,
        '9.09%': 2,
        '18.18%': 3,
        '27.27%': 4,
        '36.36%': 5,
        '45.45%': 6,
        '54.54%': 7,
        '63.63%': 8,
        '72.72%': 9,
        '81.81%': 10,
        '91%': 11,
        max: 12,
      },
    });
  }

  yearSlider() {
    // const snapSlider = document.getElementById('count-slider');
    noUiSlider.create(this.yearSliderElement, {
      start: [1950, 2020],
      snap: true,
      connect: true,
      step: 10,
      range: {
        min: 1950,
        '16.67%': 1960,
        '33.34%': 1970,
        '37.5%': 1980,
        '50.01%': 1990,
        '66.68%': 2000,
        '83.35%': 2010,
        max: 2020,
      },
    });
  }
}

export default RangeFilters;
