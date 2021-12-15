import BaseElement from './BaseElement';

class Title extends BaseElement {
  constructor(tagName: string, className: string[], text: string) {
    super(tagName, className);
    this.element.textContent = text;
  }
}

export default Title;
