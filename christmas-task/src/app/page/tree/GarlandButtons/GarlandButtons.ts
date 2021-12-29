import './_choose-garland.scss';

import BaseElement from '../../../components/BaseElement';

class GarlandButtons extends BaseElement {
  constructor(color: string) {
    super('button', ['garland-button', `garland-button_${color}`]);
    this.element.dataset.garland = color;
  }
}

export default GarlandButtons;
