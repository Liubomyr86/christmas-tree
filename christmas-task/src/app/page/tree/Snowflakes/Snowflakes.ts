import './_snowflakes.scss';

import BaseElement from '../../../components/BaseElement';

class Snowflakes extends BaseElement {
  snowflake: HTMLElement | undefined;

  constructor(number: number) {
    super('div');
    for (let i = 0; i < number; i++) {
      this.snowflake = new BaseElement('i').render(this.element);
    }
  }

  setClassName(className: string) {
    this.element.className = className;
  }
}

export default Snowflakes;
