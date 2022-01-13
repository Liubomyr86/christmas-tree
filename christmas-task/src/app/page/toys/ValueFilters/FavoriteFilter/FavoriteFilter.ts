import './_favorite-filter.scss';
import BaseElement from '../../../../components/BaseElement';
import Title from '../../../../components/Title';

class FavoriteFilter extends BaseElement {
  checkboxContainer: HTMLElement;
  checkbox: HTMLElement;
  lable: HTMLElement;
  constructor() {
    super('div', ['favorite']);
    new Title('h3', ['controls__subtitle'], 'Favorite:').render(this.element);
    this.checkboxContainer = new BaseElement('div', [
      'favorite__container',
    ]).render(this.element);

    this.checkbox = new BaseElement('input', ['favorite__button']).render(
      this.checkboxContainer
    );
    this.checkbox.setAttribute('type', 'checkbox');
    this.checkbox.setAttribute('id', 'checkbox');
    this.lable = new BaseElement('label', ['favorite__label']).render(
      this.checkboxContainer
    );
    this.lable.setAttribute('for', 'checkbox');
  }
}

export default FavoriteFilter;
