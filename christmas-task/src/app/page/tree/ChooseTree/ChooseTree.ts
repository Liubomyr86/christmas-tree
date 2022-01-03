import './_choose-tree.scss';
import BaseElement from '../../../components/BaseElement';

class ChooseTree extends BaseElement {
  setImaeSrc: (path: string) => void;

  constructor(path: string, setImageSrc: (path: string) => void) {
    super('div', ['tree-item']);
    this.setImaeSrc = setImageSrc;
    this.element.style.backgroundImage = `url(${path})`;
    this.getPath(path);
  }

  getPath(path: string) {
    this.element.addEventListener('click', () => {
      this.setImaeSrc(path);
    });
  }
}

export default ChooseTree;
