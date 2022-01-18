import BaseElement from '../../../components/BaseElement';
import Title from '../../../components/Title';
import { IFilterData } from '../../../utils/alias';
import data from '../../../utils/data';
import ShapeFilter from './ShapeFilter/ShapeFilter';
import ColorFilter from './ColorFilter/ColorFilter';
import SizeFilter from './SizeFilter/SizeFilter';
import { storage } from '../../../utils/global';

class ValueFilters extends BaseElement {
  data: IFilterData;
  title: HTMLElement;
  button: HTMLElement | undefined;
  shapeContainer: HTMLElement;
  colorContainer: HTMLElement;
  sizeContainer: HTMLElement;
  filter: () => void;
  value: string = '';

  private selectedShapes = new Set<string>();
  private selectedColors = new Set<string>();
  private selectedSize = new Set<string>();

  checkShapeIsSelected(shape: string): boolean {
    return this.selectedShapes.size === 0 || this.selectedShapes.has(shape);
  }

  checkColorIsSelected(color: string): boolean {
    return this.selectedColors.size === 0 || this.selectedColors.has(color);
  }

  checkSizeIsSelected(size: string): boolean {
    return this.selectedSize.size === 0 || this.selectedSize.has(size);
  }

  clearSet() {
    this.selectedShapes.clear();
    this.selectedColors.clear();
    this.selectedSize.clear();
  }

  resetStyles() {
    const shapes: Element[] = Array.from(this.shapeContainer.children);
    for (let shape of shapes) {
      if (shape.className.includes('shape__button_active')) {
        shape.classList.remove('shape__button_active');
      }
    }
    const colors: Element[] = Array.from(this.colorContainer.children);
    for (let color of colors) {
      if (color.className.includes('color__button_active')) {
        color.classList.remove('color__button_active');
      }
    }
    const sizes: Element[] = Array.from(this.sizeContainer.children);
    for (let size of sizes) {
      if (size.className.includes('size__button_active')) {
        size.classList.remove('size__button_active');
      }
    }
  }

  constructor(pushDatasetValueFilters: () => void) {
    super('div', ['filters']);
    this.filter = pushDatasetValueFilters;
    this.data = this.getToysData();
    this.title = new Title(
      'h2',
      ['controls__title'],
      'Filters by value'
    ).render(this.element);

    this.shapeContainer = new ShapeFilter(this.data.shape).render(this.element);
    this.colorContainer = new ColorFilter(this.data.color).render(this.element);
    this.sizeContainer = new SizeFilter(this.data.size).render(this.element);

    this.selectFilters();
    this.getFilterValuesFromLocalStorage();
  }

  getToysData() {
    const filterCategories = {
      shape: [...new Set(data.map((item) => item.shape))],
      color: [...new Set(data.map((item) => item.color))],
      size: [...new Set(data.map((item) => item.size))],
    };

    return filterCategories;
  }

  selectFilters() {
    this.element.addEventListener('click', (event) => {
      const target = <HTMLElement>event.target;
      if (target.tagName !== 'BUTTON') return false;

      const buttonElement = target.dataset['filter'];
      const [filterCategory, filterName] = buttonElement!.split('-');

      if (target.classList.contains(`${filterCategory}__button_active`)) {
        target.classList.remove(`${filterCategory}__button_active`);
        switch (filterCategory) {
          case 'shape':
            this.removeSelectedFilterValue(this.selectedShapes, filterName);
            this.value = JSON.stringify([...this.selectedShapes]);
            break;
          case 'color':
            this.removeSelectedFilterValue(this.selectedColors, filterName);
            this.value = JSON.stringify([...this.selectedColors]);

            break;
          case 'size':
            this.removeSelectedFilterValue(this.selectedSize, filterName);
            this.value = JSON.stringify([...this.selectedSize]);

            break;
          default:
            break;
        }
        this.filter();
      } else {
        target.classList.add(`${filterCategory}__button_active`);
        switch (filterCategory) {
          case 'shape':
            this.addSelectedFilterValue(this.selectedShapes, filterName);
            this.value = JSON.stringify([...this.selectedShapes]);

            break;
          case 'color':
            this.addSelectedFilterValue(this.selectedColors, filterName);
            this.value = JSON.stringify([...this.selectedColors]);

            break;
          case 'size':
            this.addSelectedFilterValue(this.selectedSize, filterName);
            this.value = JSON.stringify([...this.selectedSize]);

            break;
          default:
            break;
        }

        this.filter();
      }
      storage.setItemToLocalStorage(`ct-${filterCategory}`, this.value);
    });
  }

  addSelectedFilterValue(filterSet: Set<string>, name: string) {
    filterSet.add(name);
  }

  removeSelectedFilterValue(filterSet: Set<string>, name: string) {
    filterSet.delete(name);
  }

  getFilterValuesFromLocalStorage() {
    if (storage.getItemFromLocalStorage('ct-shape')) {
      const filtersName = JSON.parse(
        storage.getItemFromLocalStorage('ct-shape')!
      );
      const shapes: Element[] = Array.from(this.shapeContainer.children);
      for (let name of filtersName) {
        this.addSelectedFilterValue(this.selectedShapes, name);
        for (let shape of shapes) {
          if (shape.className.includes(`shape__button_${name}`)) {
            shape.classList.add('shape__button_active');
          }
        }
      }
    }
    if (storage.getItemFromLocalStorage('ct-color')) {
      const filtersName = JSON.parse(
        storage.getItemFromLocalStorage('ct-color')!
      );
      const colors: Element[] = Array.from(this.colorContainer.children);

      for (let name of filtersName) {
        this.addSelectedFilterValue(this.selectedColors, name);
        for (let color of colors) {
          if (color.className.includes(`color__button_${name}`)) {
            color.classList.add('color__button_active');
          }
        }
      }
    }
    if (storage.getItemFromLocalStorage('ct-size')) {
      const filtersName = JSON.parse(
        storage.getItemFromLocalStorage('ct-size')!
      );
      const sizes: Element[] = Array.from(this.sizeContainer.children);

      for (let name of filtersName) {
        this.addSelectedFilterValue(this.selectedSize, name);
        for (let size of sizes) {
          if (size.className.includes(`size__button_${name}`)) {
            size.classList.add('size__button_active');
          }
        }
      }
    }
  }
}

export default ValueFilters;
