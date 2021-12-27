import './_favorite-toy.scss';

import BaseElement from '../../../components/BaseElement';
import data from '../../../utils/data';
import { IToyCardData } from '../../../utils/alias';

class FavoriteToy extends BaseElement {
  toyCounter: HTMLElement;
  arr: number[];
  image: HTMLElement | undefined;

  constructor(data: IToyCardData) {
    super('div', ['tree__favorite-toy', 'favorite-toy']);
    this.element.dataset.num = data.num;
    this.arr = this.convertNumberToArray(data.amount);

    this.toyCounter = new BaseElement(
      'p',
      ['favorite-toy__count'],
      data.amount
    ).render(this.element);
    this.arr.forEach((item) => {
      this.image = new BaseElement('img', ['favorite-toy__image']).render(
        this.element
      );
      this.image.setAttribute('src', `public/toys/${data.num}.png`);
      this.image.setAttribute('alt', 'favorite-toy');
      this.image.id = `${data.num}-${item}`;
      this.image.dataset.imgnum = data.num;
      this.image.draggable = true;
    });
  }

  convertNumberToArray(num: string) {
    const number = +num;
    return Array.from(new Array(number), (x, i) => i + 1);
  }
}

export default FavoriteToy;
