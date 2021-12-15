import BaseElement from './BaseElement';

class Title extends BaseElement {
  constructor(tagName, className, text) {
    super(tagName, className);
    this.element.textContent = text;
  }
}

export default Title;
