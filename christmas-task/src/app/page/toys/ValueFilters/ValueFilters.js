import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';

class ValueFilters extends BaseElement {
  constructor(data) {
    super('div', ['filters']);
    this.title = new Title(
      'h2',
      ['controls__title'],
      'FILTERS BY VALUE'
    ).render();

    this.element.append(this.title);
    this.shapeContainer = new BaseElement('div', ['shape']).render();
    this.shapeContainer.append(
      new Title('h3', ['controls__subtitle'], 'Shape').render()
    );
    data.shape.map((item) => {
      this.button = new BaseElement('button', [
        'shape__button',
        `shape__button_${item}`,
      ]).render();
      this.shapeContainer.append(this.button);
    });

    this.colorContainer = new BaseElement('div', ['color']).render();
    this.colorContainer.append(
      new Title('h3', ['controls__subtitle'], 'Color').render()
    );
    data.color.map((item) => {
      this.button = new BaseElement('button', [
        'shape__button',
        `shape__button_${item}`,
      ]).render();
      this.colorContainer.append(this.button);
    });

    this.sizeContainer = new BaseElement('div', ['size']).render();
    this.sizeContainer.append(
      new Title('h3', ['controls__subtitle'], 'Size').render()
    );
    data.size.map((item) => {
      this.button = new BaseElement('button', [
        'size__button',
        `size__button_${item}`,
      ]).render();
      this.sizeContainer.append(this.button);
    });

    this.favoriteContainer = new BaseElement('div', ['favorite']).render();
    this.favoriteContainer.append(
      new Title('h3', ['controls__subtitle'], 'Favorite').render()
    );
    this.checkbox = new BaseElement('input', ['favorite__button']).render();
    this.checkbox.setAttribute('type', 'checkbox');
    this.favoriteContainer.append(this.checkbox);

    this.element.append(this.shapeContainer);
    this.element.append(this.colorContainer);
    this.element.append(this.sizeContainer);
    this.element.append(this.favoriteContainer);
  }
}

export default ValueFilters;
