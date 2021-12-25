import './_value-filters.scss';

import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';
import { IFilterData, IToyCardData } from '../../../utils/alias';
import data from '../../../utils/data';

class ValueFilters extends BaseElement {
  data: IFilterData;
  title: HTMLElement;
  button: HTMLElement | undefined;
  shapeContainer: HTMLElement;
  colorContainer: HTMLElement;
  sizeContainer: HTMLElement;
  favoriteContainer: HTMLElement;
  checkbox: HTMLElement;
  checkboxContainer: HTMLElement;
  lable: HTMLElement;
  filter: (category: string, name: string, flag: boolean) => void;

  private selectedShapes = new Set<string>();

  checkShapeIsSelected(shape: string): boolean {
    return this.selectedShapes.size === 0 || this.selectedShapes.has(shape);
  }

  constructor(
    pushDatasetValueFilters: (
      category: string,
      name: string,
      flag: boolean
    ) => void
  ) {
    super('div', ['filters']);
    this.filter = pushDatasetValueFilters;
    this.data = this.getToysData();
    this.title = new Title(
      'h2',
      ['controls__title'],
      'Filters by value'
    ).render(this.element);

    this.shapeContainer = new BaseElement('div', ['shape']).render(
      this.element
    );

    new Title('h3', ['controls__subtitle'], 'Shape:').render(
      this.shapeContainer
    );
    this.data.shape.forEach((item) => {
      this.button = new BaseElement('button', [
        'shape__button',
        `shape__button_${item}`,
      ]).render(this.shapeContainer);
      this.button.dataset.filter = `shape-${item}`;
    });

    this.colorContainer = new BaseElement('div', ['color']).render(
      this.element
    );
    new Title('h3', ['controls__subtitle'], 'Color:').render(
      this.colorContainer
    );
    this.data.color.forEach((item) => {
      this.button = new BaseElement('button', [
        'color__button',
        `color__button_${item}`,
      ]).render(this.colorContainer);
      this.button.dataset.filter = `color-${item}`;
    });

    this.sizeContainer = new BaseElement('div', ['size']).render(this.element);
    new Title('h3', ['controls__subtitle'], 'Size:').render(this.sizeContainer);
    this.data.size.forEach((item) => {
      this.button = new BaseElement('button', [
        'size__button',
        `size__button_${item}`,
      ]).render(this.sizeContainer);
      this.button.dataset.filter = `size-${item}`;
    });

    this.favoriteContainer = new BaseElement('div', ['favorite']).render(
      this.element
    );
    new Title('h3', ['controls__subtitle'], 'Favorite:').render(
      this.favoriteContainer
    );
    this.checkboxContainer = new BaseElement('div', [
      'favorite__container',
    ]).render(this.favoriteContainer);

    this.checkbox = new BaseElement('input', ['favorite__button']).render(
      this.checkboxContainer
    );
    this.checkbox.setAttribute('type', 'checkbox');
    this.checkbox.setAttribute('id', 'checkbox');
    this.lable = new BaseElement('label', ['favorite__label']).render(
      this.checkboxContainer
    );
    this.lable.setAttribute('for', 'checkbox');
    this.selectFilter();
  }

  getToysData() {
    const filterCategories = {
      shape: [...new Set(data.map((item) => item.shape))],
      color: [...new Set(data.map((item) => item.color))],
      size: [...new Set(data.map((item) => item.size))],
    };

    return filterCategories;
  }

  selectFilter() {
    this.element.addEventListener('click', (event) => {
      // console.log(this.data);
      const target = <HTMLElement>event.target;

      if (target.tagName !== 'BUTTON') return false;

      const buttonElement = target.dataset['filter'];
      const [filterCategory, filterName] = buttonElement!.split('-');

      if (target.classList.contains(`${filterCategory}__button_active`)) {
        this.filter(filterCategory, filterName, false);

        target.classList.remove(`${filterCategory}__button_active`);
      } else {
        this.filter(filterCategory, filterName, true);
        target.classList.add(`${filterCategory}__button_active`);
      }

      // console.log(filterCategory, filterName);
    });
  }
}

export default ValueFilters;
