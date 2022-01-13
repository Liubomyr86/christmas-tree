import './_size-filter.scss';

import BaseElement from '../../../../components/BaseElement';
import Title from '../../../../components/Title';

class SizeFilter extends BaseElement {
  size: string[];
  button: HTMLElement | undefined;

  constructor(sizeData: string[]) {
    super('div', ['size']);
    this.size = sizeData;
    new Title('h3', ['controls__subtitle'], 'Size:').render(this.element);
    this.size.forEach((item) => {
      this.button = new BaseElement('button', [
        'size__button',
        `size__button_${item}`,
      ]).render(this.element);
      this.button.dataset.filter = `size-${item}`;
    });
  }
}

export default SizeFilter;
