import './_snowfalake-button.scss';

import BaseElement from '../../../components/BaseElement';
import { state } from '../../../utils/global';

class SnowflakeButton extends BaseElement {
  constructor() {
    super('span', ['snowflake']);
    this.onOffSnowflakes();
  }

  onOffSnowflakes() {
    this.element.addEventListener('click', () => {
      const snowflakeClassName = state.getSnowflakesClass();
      if (!snowflakeClassName) {
        state.setSnowflakesClass('snowflakes');
      } else {
        state.setSnowflakesClass('');
      }
    });
  }
}

export default SnowflakeButton;
