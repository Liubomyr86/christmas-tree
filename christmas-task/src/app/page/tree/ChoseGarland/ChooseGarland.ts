import './_choose-garland.scss';

import BaseElement from '../../../components/BaseElement';

class ChooseGarland extends BaseElement {
  constructor(color: string) {
    super('button', ['garland-button', `garland-button_${color}`]);
    this.element.dataset.garland = color;
  }
}

export default ChooseGarland;
