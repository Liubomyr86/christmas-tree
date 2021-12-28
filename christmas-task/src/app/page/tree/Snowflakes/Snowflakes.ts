import './_snowflakes.scss';

import BaseElement from '../../../components/BaseElement';
import { state } from '../../../utils/global';

class Snowflakes extends BaseElement {
  snowflake: HTMLElement | undefined;

  constructor(number: number) {
    super('div');
    for (let i = 0; i < number; i++) {
      this.snowflake = new BaseElement('i').render(this.element);
    }
    this.onOffSnow();
  }
  onOffSnow() {
    setInterval(() => {
      const name = state.getSnowflakesClass();
      console.log(name);
      this.element.className = name;
    }, 100);
  }
}

export default Snowflakes;
