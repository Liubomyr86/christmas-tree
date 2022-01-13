import './_color-filter.scss';

import BaseElement from '../../../../components/BaseElement';
import Title from '../../../../components/Title';

class ColorFilter extends BaseElement {
  color: string[];
  button: HTMLElement | undefined;
  constructor(colorData: string[]) {
    super('div', ['color']);
    this.color = colorData;
    new Title('h3', ['controls__subtitle'], 'Color:').render(this.element);
    this.color.forEach((item) => {
      this.button = new BaseElement('button', [
        'color__button',
        `color__button_${item}`,
      ]).render(this.element);
      this.button.dataset.filter = `color-${item}`;
    });
  }
}

export default ColorFilter;
