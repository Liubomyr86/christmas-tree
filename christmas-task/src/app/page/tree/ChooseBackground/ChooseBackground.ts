import { Cache } from 'webpack';
import BaseElement from '../../../components/BaseElement';
import './_choose-background.scss';

class ChooseBackground extends BaseElement {
  constructor(path: string) {
    super('div', ['tree-background']);
    this.element.style.backgroundImage = `url(${path})`;
  }
}

export default ChooseBackground;
