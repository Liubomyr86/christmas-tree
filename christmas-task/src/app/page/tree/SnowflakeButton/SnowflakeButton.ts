import './_snowfalake-button.scss';

import BaseElement from '../../../components/BaseElement';
import { state } from '../../../utils/global';

class SnowflakeButton extends BaseElement {
  setClassName: (className: string) => void;
  isChecked: boolean = false;

  constructor(setClassName: (className: string) => void) {
    super('span', ['snowflake']);
    this.setClassName = setClassName;
    this.onOffSnowflakes();
  }

  onOffSnowflakes() {
    this.element.addEventListener('click', () => {
      if (!this.isChecked) {
        this.setClassName('snowflakes');
        this.isChecked = true;
      } else {
        this.setClassName('');
        this.isChecked = false;
      }
    });
  }
}

export default SnowflakeButton;
