class BaseElement {
  constructor(tagName, className) {
    this.element = document.createElement(tagName);
    this.element.classList.add(...className);
    this.render();
  }

  render() {
    return this.element;
  }
}

export default BaseElement;
