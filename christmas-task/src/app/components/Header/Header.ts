import BaseElement from '../BaseElement';

class Header extends BaseElement {
  constructor() {
    super('header', ['header']);

    this.element.innerHTML = `
      <div class="header__container container">
        <nav class="header__navigation navigation">
          <ul class="navigation__list">
            <li class="navigation__item">
              <a class="navigation__link" href="#">Main</a>
            </li>
            <li class="navigation__item">
              <a class="navigation__link" href="#">Toys</a>
            </li>
            <li class="navigation__item">
              <a class="navigation__link" href="#">Christmas tree</a>
            </li>
          </ul>
        </nav>
        <div class="header__basket">
          <span></span>
        </div>
      </div>
    `;
  }
}

export default Header;
