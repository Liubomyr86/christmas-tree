import './_hamburger.scss';
import BaseElement from '../../../components/BaseElement';

class Hamburger extends BaseElement {
  settings: HTMLElement;
  constructor(element: HTMLElement) {
    super('span', ['hamburger-button']);
    this.settings = element;
    this.element.innerHTML = `
      <span class="hamburger-button__line"></span>
    `;
    this.moveSettings(this.settings);
  }

  moveSettings(elment: HTMLElement) {
    this.element.addEventListener('click', () => {
      elment.classList.toggle('tree__settings_open');
      this.element.parentElement?.classList.toggle('open');
      this.element.classList.toggle('open');
    });
  }
}

export default Hamburger;
