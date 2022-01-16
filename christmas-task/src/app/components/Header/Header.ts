import './_header.scss';

import BaseElement from '../BaseElement';
import { state } from '../../utils/global';

class Header extends BaseElement {
  navigationLinks: NodeListOf<Element> | undefined;
  navigationList: HTMLElement;
  toysLink: Element | undefined;
  basketCouunt: Element | null | undefined;

  constructor() {
    super('header', ['header']);

    this.element.innerHTML = `
      <div class="header__container container">
        <nav class="header__navigation navigation">
          <ul class="navigation__list">
            <li class="navigation__item">
              <a class="logo" href="#main-page"></a>
            </li>
            <li class="navigation__item">
              <a class="navigation__link" href="#toys-page" data-link="toys">Toys</a>
            </li>
            <li class="navigation__item">
              <a class="navigation__link" href="#tree-page">Christmas tree</a>
            </li>
          </ul>
        </nav>
        <div class="header__basket basket">
          <span class="basket__count">0</span>
        </div>
      </div>
    `;

    this.navigationList = this.element.querySelector('.navigation__list')!;

    this.changeCount();
    this.changeActiveLink();
  }

  changeCount() {
    this.basketCouunt = document.querySelector('.basket__count');
    if (this.basketCouunt) {
      const count = state.getArrayLength();
      this.basketCouunt.textContent = count.toString();
    }
  }

  changeActiveLink() {
    this.navigationList.addEventListener('click', () => {
      this.changeLinkStyle();
    });
  }

  changeLinkStyle(): void | false {
    this.navigationLinks = document.querySelectorAll('.navigation__link');
    this.toysLink = document.querySelector('[data-link]')!;

    const target = <HTMLElement>event!.target;
    if (target.tagName !== 'A') return false;
    if (target.className.match('navigation__link')) {
      this.navigationLinks.forEach((item) => {
        item.className = 'navigation__link';
      });
      target.className = 'navigation__link active-link';
    } else if (target.className.match('first-page__button')) {
      this.toysLink!.className = 'navigation__link active-link';
    } else {
      this.navigationLinks.forEach((item) => {
        item.className = 'navigation__link';
      });
    }
  }
}

export default Header;
