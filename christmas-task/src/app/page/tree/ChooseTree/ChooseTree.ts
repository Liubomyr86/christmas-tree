import './_choose-tree.scss';
import BaseElement from '../../../components/BaseElement';
import { state } from '../../../utils/global';

class ChooseTree extends BaseElement {
  constructor(path: string) {
    super('div', ['tree-item']);
    this.element.style.backgroundImage = `url(${path})`;
    this.getPath(path);
  }

  getPath(path: string) {
    this.element.addEventListener('click', () => {
      state.setTreeUrl(path);
    });
  }
}

export default ChooseTree;
