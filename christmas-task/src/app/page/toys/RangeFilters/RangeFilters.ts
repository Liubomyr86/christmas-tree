import 'nouislider/dist/nouislider.css';
import './_range-filters.scss';

import noUiSlider, { target } from 'nouislider';
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
  countOutputLower: HTMLElement;
  countOutputUpper: HTMLElement;
  yearOutputLower: HTMLElement;
  yearOutputUpper: HTMLElement;
  private countValues: number[] = [1, 12];
  private yearValues: number[] = [1940, 2020];

  checkCountValues() {
    return this.countValues;
  }

  checkYearValues() {
    return this.yearValues;
  }

  filter: () => void;

  constructor(setFilters: () => void) {
    super('div', ['range']);
    this.filter = setFilters;
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
    this.countOutputLower = new BaseElement(
      'output',
      ['range__output'],
      '1'
    ).render(this.countRangeContainer);
    this.countSliderElement = new BaseElement('div', ['count__slider']).render(
      this.countRangeContainer
    );
    this.countSliderElement.id = 'count-slider';
    this.countOutputUpper = new BaseElement(
      'output',
      ['range__output'],
      '12'
    ).render(this.countRangeContainer);

    this.yearContainer = new BaseElement('div', ['year']).render(this.element);
    new Title('h3', ['controls__subtitle'], 'Purchase year:').render(
      this.yearContainer
    );
    this.yearRangeContainer = new BaseElement('div', [
      'year__range-container',
    ]).render(this.yearContainer);
    this.yearOutputLower = new BaseElement(
      'output',
      ['range__output'],
      '1940'
    ).render(this.yearRangeContainer);

    this.yearSliderElement = new BaseElement('div', ['year__slider']).render(
      this.yearRangeContainer
    );
    this.yearOutputUpper = new BaseElement(
      'output',
      ['range__output'],
      '2020'
    ).render(this.yearRangeContainer);

    this.countSlider();
    this.yearSlider();
    this.readCountValue(this.countValues, this.filter);
    this.readYearValue(this.yearValues, this.filter);
  }

  countSlider() {
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
    noUiSlider.create(this.yearSliderElement, {
      start: [1940, 2020],
      snap: true,
      connect: true,
      step: 10,
      range: {
        min: 1940,
        '12.5': 1950,
        '25%': 1960,
        '37.5%': 1970,
        '50%': 1980,
        '62.5%': 1990,
        '75%': 2000,
        '87.5%': 2010,
        max: 2020,
      },
    });
  }

  readCountValue(arr: number[], callback: () => void) {
    const skipValues = [this.countOutputLower, this.countOutputUpper];
    (<target>this.countSliderElement).noUiSlider!.on(
      'update',
      function (values, handle) {
        let [min, max] = values;
        min = +min;
        max = +max;
        arr[0] = min;
        arr[1] = max;
        callback();
        values = [min, max];
        skipValues[handle].innerHTML = values[handle].toString();
      }
    );
  }
  readYearValue(arr: number[], callback: () => void) {
    const skipValues = [this.yearOutputLower, this.yearOutputUpper];
    (<target>this.yearSliderElement).noUiSlider!.on(
      'update',
      function (values, handle) {
        let [min, max] = values;
        min = +min;
        max = +max;
        arr[0] = min;
        arr[1] = max;
        callback();
        values = [min, max];
        skipValues[handle].innerHTML = values[handle].toString();
      }
    );
  }
}

export default RangeFilters;
