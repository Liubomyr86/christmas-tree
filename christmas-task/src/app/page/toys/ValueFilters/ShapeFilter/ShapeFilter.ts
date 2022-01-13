import './_shape-filter.scss';
import BaseElement from '../../../../components/BaseElement';
import Title from '../../../../components/Title';

class ShapeFilter extends BaseElement {
  shape: string[];
  button: HTMLElement | undefined;

  constructor(shapeData: string[]) {
    super('div', ['shape']);
    this.shape = shapeData;

    new Title('h3', ['controls__subtitle'], 'Shape:').render(this.element);
    this.shape.forEach((item) => {
      this.button = new BaseElement('button', [
        'shape__button',
        `shape__button_${item}`,
      ]).render(this.element);
      this.button.dataset.filter = `shape-${item}`;
    });
  }
}

export default ShapeFilter;
