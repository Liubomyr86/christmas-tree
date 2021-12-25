import './_main-page.scss';

import BaseElement from '../../components/BaseElement';

class MainPage extends BaseElement {
  constructor() {
    super('main', ['main']);

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
      <a class="first-page__button" href="#">Start</a>
    </div>
    `;
  }
}

export default MainPage;
