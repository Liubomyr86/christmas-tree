import './_footer.scss';
import BaseElement from '../BaseElement';

class Footer extends BaseElement {
  constructor() {
    super('footer', ['footer']);

    this.element.innerHTML = `
      <div class="footer__container container">
        <div class="footer__data">
          <p class="year">© 2021</p>
          <p class="footer__developer">
            App developer: <a class="github" href="https://github.com/Liubomyr86" target="_blank">Liubomyr Demianchuk</a>
          </p>
        </div>
        <div class="footer__logo">
          <a class="rss-logo" href="https://rs.school/js" target="_blank"></a>
        </div>
      </div>
    `;
  }
}

export default Footer;
