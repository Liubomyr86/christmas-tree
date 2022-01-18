import './_snowflakes.scss';

import BaseElement from '../../../components/BaseElement';
import { storage } from '../../../utils/global';

class Snowflakes extends BaseElement {
  snowflake: HTMLElement | undefined;

  constructor(number: number) {
    super('div');
    for (let i = 0; i < number; i++) {
      this.snowflake = new BaseElement('i').render(this.element);
    }
    this.getClassNameFromLocaleStorage();
  }

  setClassName(className: string) {
    this.element.className = className;
  }

  getClassNameFromLocaleStorage() {
    const name = storage.getItemFromLocalStorage('ct-snowflake');
    this.element.className = name!;
  }
}

export default Snowflakes;
