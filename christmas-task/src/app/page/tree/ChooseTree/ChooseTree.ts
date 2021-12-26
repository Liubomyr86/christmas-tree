import './_choose-tree.scss';
import BaseElement from '../../../components/BaseElement';

class ChooseTree extends BaseElement {
  constructor(path: string) {
    super('div', ['tree-item']);
    this.element.style.backgroundImage = `url(${path})`;
  }
}

export default ChooseTree;
