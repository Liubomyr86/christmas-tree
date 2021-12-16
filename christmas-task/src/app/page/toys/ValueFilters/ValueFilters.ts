import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';
import { IFilterData } from '../../../utils/alias';

class ValueFilters extends BaseElement {
  title: HTMLElement;
  button: HTMLElement | undefined;
  shapeContainer: HTMLElement;
  colorContainer: HTMLElement;
  sizeContainer: HTMLElement;
  favoriteContainer: HTMLElement;
  checkbox: HTMLElement;

  constructor(data: IFilterData) {
    super('div', ['filters']);
    this.title = new Title(
      'h2',
      ['controls__title'],
      'FILTERS BY VALUE'
    ).render(this.element);

    this.shapeContainer = new BaseElement('div', ['shape']).render(
      this.element
    );

    new Title('h3', ['controls__subtitle'], 'Shape').render(
      this.shapeContainer
    );
    data.shape.map((item) => {
      this.button = new BaseElement('button', [
        'shape__button',
        `shape__button_${item}`,
      ]).render(this.shapeContainer);
    });

    this.colorContainer = new BaseElement('div', ['color']).render(
      this.element
    );
    new Title('h3', ['controls__subtitle'], 'Color').render(
      this.colorContainer
    );
    data.color.map((item) => {
      this.button = new BaseElement('button', [
        'shape__button',
        `shape__button_${item}`,
      ]).render(this.colorContainer);
    });

    this.sizeContainer = new BaseElement('div', ['size']).render(this.element);
    new Title('h3', ['controls__subtitle'], 'Size').render(this.sizeContainer);
    data.size.map((item) => {
      this.button = new BaseElement('button', [
        'size__button',
        `size__button_${item}`,
      ]).render(this.sizeContainer);
    });

    this.favoriteContainer = new BaseElement('div', ['favorite']).render(
      this.element
    );
    new Title('h3', ['controls__subtitle'], 'Favorite').render(
      this.favoriteContainer
    );

    this.checkbox = new BaseElement('input', ['favorite__button']).render(
      this.favoriteContainer
    );
    this.checkbox.setAttribute('type', 'checkbox');
  }
}

export default ValueFilters;
