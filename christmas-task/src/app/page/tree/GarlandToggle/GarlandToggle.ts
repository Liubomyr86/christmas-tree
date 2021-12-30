import './_garland-toggle.scss';

import BaseElement from '../../../components/BaseElement';

class GarlandToggle extends BaseElement {
  input: HTMLInputElement;
  setData: (flag: boolean) => void;

  constructor(flag: boolean, setData: (flag: boolean) => void) {
    super('div', ['tree__garland-toggle']);

    this.setData = setData;
    this.element.innerHTML = `
      <input class="toggle" type="checkbox" id="garland-toggle" name="garland-toggle">
      <label class="switch" for="garland-toggle">on</label>
    `;
    this.input = this.element.querySelector('.toggle')!;
    this.input.checked = flag;
    this.changeToggle();
  }

  changeToggle() {
    this.element.addEventListener('click', () => {
      const flag = this.input.checked;
      this.setData(flag);
    });
  }
}

export default GarlandToggle;
