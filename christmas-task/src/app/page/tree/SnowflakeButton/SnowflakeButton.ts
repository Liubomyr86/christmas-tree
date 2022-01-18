import './_snowfalake-button.scss';

import BaseElement from '../../../components/BaseElement';
import { storage } from '../../../utils/global';

class SnowflakeButton extends BaseElement {
  setClassName: (className: string) => void;
  isChecked: boolean = false;

  constructor(setClassName: (className: string) => void) {
    super('span', ['snowflake']);
    this.setClassName = setClassName;
    this.onOffSnowflakes();
    this.getSnowflakeCheckedFromLocaleStorage();
  }

  onOffSnowflakes() {
    this.element.addEventListener('click', () => {
      if (!this.isChecked) {
        this.setClassName('snowflakes');
        this.isChecked = true;
        storage.setItemToLocalStorage('ct-snowflake', 'snowflakes');
        storage.setItemToLocalStorage('ct-snowflakeChecked', 'true');
      } else {
        this.setClassName('');
        this.isChecked = false;
        storage.setItemToLocalStorage('ct-snowflake', '');
        storage.setItemToLocalStorage('ct-snowflakeChecked', 'false');
      }
    });
  }

  getSnowflakeCheckedFromLocaleStorage() {
    const check: boolean = JSON.parse(
      storage.getItemFromLocalStorage('ct-snowflakeChecked')!
    );
    this.isChecked = check;
  }
}

export default SnowflakeButton;
