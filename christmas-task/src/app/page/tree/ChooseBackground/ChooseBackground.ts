import { Cache } from 'webpack';
import BaseElement from '../../../components/BaseElement';
import { state } from '../../../utils/global';
import './_choose-background.scss';

class ChooseBackground extends BaseElement {
  constructor(path: string) {
    super('div', ['tree-background']);
    this.element.style.backgroundImage = `url(${path})`;
    this.getPath(path);
  }

  getPath(path: string) {
    this.element.addEventListener('click', () => {
      state.setBackgroundUrl(path);
    });
  }
}

export default ChooseBackground;
