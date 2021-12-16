class BaseElement {
  element: HTMLElement;

  constructor(tagName: string, className: string[], text?: string) {
    this.element = document.createElement(tagName);
    this.element.classList.add(...className);
    if (text) this.element.textContent = text;
  }

  render(elem: HTMLElement): HTMLElement {
    return elem.appendChild(this.element);
  }
}

export default BaseElement;
