import './_choose-background.scss';

import BaseElement from '../../../components/BaseElement';
import { storage } from '../../../utils/global';

class ChooseBackground extends BaseElement {
  changeBackgraundUrl: (path: string) => void;

  constructor(path: string, changeBackgraundUrl: (path: string) => void) {
    super('div', ['tree-background']);
    this.changeBackgraundUrl = changeBackgraundUrl;
    this.element.style.backgroundImage = `url(${path})`;
    this.getPath(path);
  }

  getPath(path: string) {
    this.element.addEventListener('click', () => {
      this.changeBackgraundUrl(path);
      storage.setItemToLocalStorage('ct-treeBg', path);
    });
  }
}

export default ChooseBackground;
