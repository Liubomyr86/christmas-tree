class BaseElement {
  element: HTMLElement;

  constructor(tagName: string, className: string[]) {
    this.element = document.createElement(tagName);
    this.element.classList.add(...className);
    // this.render()
  }

  render() {
    return this.element;
  }
}

export default BaseElement;
