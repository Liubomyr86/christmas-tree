import './_garland-toggle.scss';

import BaseElement from '../../../components/BaseElement';

class GarlandToggle extends BaseElement {
  input: HTMLInputElement;

  public garlandColor: string = '';

  visibilityGarland: (color: string, flag: boolean) => void;

  constructor(callback: (color: string, flag: boolean) => void) {
    super('div', ['tree__garland-toggle']);

    this.visibilityGarland = callback;
    this.element.innerHTML = `
      <input class="toggle" type="checkbox" id="garland-toggle" name="garland-toggle">
      <label class="switch" for="garland-toggle">on</label>
    `;
    this.input = this.element.querySelector('.toggle')!;
    this.changeToggle();
  }

  toggleOn(flag: boolean) {
    this.input.checked = flag;
  }

  changeToggle() {
    this.element.addEventListener('click', () => {
      this.visibilityGarland(this.garlandColor, this.input.checked);
    });
  }
}

export default GarlandToggle;
