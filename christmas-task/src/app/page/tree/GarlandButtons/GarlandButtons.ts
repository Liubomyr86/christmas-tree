import './_choose-garland.scss';

import BaseElement from '../../../components/BaseElement';
import { storage } from '../../../utils/global';

class GarlandButtons extends BaseElement {
  setData: (color: string, flag: boolean) => void;
  constructor(
    color: string,
    setGarlndData: (color: string, flag: boolean) => void
  ) {
    super('button', ['garland-button', `garland-button_${color}`]);
    this.setData = setGarlndData;

    this.element.dataset.garland = color;
    this.getData();
  }

  getData() {
    this.element.addEventListener('click', () => {
      let color = this.element.dataset.garland;
      this.setData(color!, true);
      storage.setItemToLocalStorage('ct-garlandColor', color!);
      storage.setItemToLocalStorage('ct-garlandToggle', 'true');
    });
  }
}

export default GarlandButtons;
