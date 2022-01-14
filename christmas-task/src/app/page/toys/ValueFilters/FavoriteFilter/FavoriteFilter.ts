import './_favorite-filter.scss';
import BaseElement from '../../../../components/BaseElement';
import Title from '../../../../components/Title';

class FavoriteFilter extends BaseElement {
  checkboxContainer: HTMLElement;
  checkbox: HTMLElement;
  lable: HTMLElement;

  setFilters: () => void;

  private favoriteValue: boolean[] = [true, false];
  checkFavoriteValue(value: boolean) {
    return this.favoriteValue.includes(value);
  }

  constructor(setFilters: () => void) {
    super('div', ['favorite']);

    this.setFilters = setFilters;

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
    this.checkFavoriteToys();
  }

  checkFavoriteToys() {
    console.log((<HTMLInputElement>this.checkbox).checked);

    this.lable.addEventListener('click', () => {
      if (!(<HTMLInputElement>this.checkbox).checked) {
        this.favoriteValue.pop();
        this.setFilters();
      } else {
        this.favoriteValue.push(false);
        this.setFilters();
      }
    });
  }
}

export default FavoriteFilter;
