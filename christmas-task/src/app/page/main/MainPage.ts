import './_main-page.scss';

import BaseElement from '../../components/BaseElement';

class MainPage extends BaseElement {
  button: HTMLElement;
  changeLinkStyle: () => void;

  constructor(callback: () => void) {
    super('main', ['main']);

    this.changeLinkStyle = callback;
    this.element.innerHTML = `
    <div class="first-page container">
      <div class="ball ball_big"></div>
      <div class="ball ball_small"></div>
      <div class="first-page__content">
        <p class="first-page__title">
          Christmas game
        </p>
        <p class="first-page__title">
          "Dress up the tree"
        </p>
      </div>
      <a class="first-page__button" href="#toys-page">Start</a>
    </div>
    `;
    this.button = this.element.querySelector('.first-page__button')!;
    this.setToysActivLink();
  }

  setToysActivLink() {
    this.button.addEventListener('click', () => {
      this.changeLinkStyle();
    });
  }
}

export default MainPage;
