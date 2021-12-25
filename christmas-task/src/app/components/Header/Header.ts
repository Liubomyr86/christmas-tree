import './_header.scss';

import BaseElement from '../BaseElement';
import { state } from '../../utils/global';

class Header extends BaseElement {
  basketCouunt: HTMLElement;
  constructor() {
    super('header', ['header']);

    this.element.innerHTML = `
      <div class="header__container container">
        <nav class="header__navigation navigation">
          <ul class="navigation__list">
            <li class="navigation__item">
              <a class="navigation__link logo" href="#main-page"></a>
            </li>
            <li class="navigation__item">
              <a class="navigation__link active-link" href="#toys-page">Toys</a>
            </li>
            <li class="navigation__item">
              <a class="navigation__link" href="#tree-page">Christmas tree</a>
            </li>
          </ul>
        </nav>
        <div class="header__basket basket">
          <span class="basket__count"></span>
        </div>
      </div>
    `;

    this.basketCouunt = this.element.querySelector('.basket__count')!;
    this.changeCount();
  }

  changeCount() {
    setInterval(() => {
      const count = state.getArrayLength();
      this.basketCouunt.textContent = count.toString();
    }, 100);
  }
}

export default Header;
