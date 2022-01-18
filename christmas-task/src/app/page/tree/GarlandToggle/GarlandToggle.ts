import './_garland-toggle.scss';

import BaseElement from '../../../components/BaseElement';
import { storage } from '../../../utils/global';

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
    this.getTogglCheckedFromLocalStorage();
  }

  toggleOn(flag: boolean) {
    this.input.checked = flag;
  }

  changeToggle() {
    this.element.addEventListener('click', () => {
      this.visibilityGarland(this.garlandColor, this.input.checked);
      storage.setItemToLocalStorage(
        'ct-garlandToggle',
        this.input.checked.toString()
      );
    });
  }

  getTogglCheckedFromLocalStorage() {
    const flag: boolean = JSON.parse(
      storage.getItemFromLocalStorage('ct-garlandToggle')!
    );
    const color = storage.getItemFromLocalStorage('ct-garlandColor');
    this.input.checked = flag;
    this.garlandColor = color!;
  }
}

export default GarlandToggle;
