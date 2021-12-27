import './_garland-toggle.scss';

import BaseElement from '../../../components/BaseElement';

class GarlandToggle extends BaseElement {
  constructor() {
    super('div', ['tree__garland-toggle']);
    this.element.innerHTML = `
      <input class="toggle" type="checkbox" id="garland-toggle" name="garland-toggle" checked>
      <label class="switch" for="garland-toggle">on</label>
    `;
  }
}

export default GarlandToggle;
