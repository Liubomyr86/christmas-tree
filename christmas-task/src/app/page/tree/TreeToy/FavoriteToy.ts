import './_favorite-toy.scss';

import BaseElement from '../../../components/BaseElement';
import data from '../../../utils/data';
import { IToyCardData } from '../../../utils/alias';
import { state } from '../../../utils/global';

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
      this.image.id = `num:${data.num}item:${item}`;
      this.image.dataset.imgnum = `${data.num}-${item}`;
      this.image.draggable = true;
      this.handlerDragStart();
      this.handleDragEnd();
    });
  }

  convertNumberToArray(num: string) {
    const number = +num;
    return Array.from(new Array(number), (x, i) => i + 1);
  }

  handlerDragStart() {
    this.image!.addEventListener('dragstart', (event) => {
      state.dragStart(event);
    });
  }

  dragEnd(event: DragEvent) {
    console.log(event.dataTransfer?.dropEffect);
    if (event.dataTransfer?.dropEffect === 'none') {
      if (this.image!.parentNode?.nodeName === 'AREA') {
        const elemData = this.image!.dataset.imgnum?.split('-');
        console.log(elemData![0]);
        const container = document.querySelector(
          `[data-num="${elemData![0]}"]`
        );
        const top = (<HTMLElement>container!).offsetTop;
        const left = (<HTMLElement>container!).offsetLeft;
        console.log(top, left);

        this.image!.style.top = `${top + 12}px`;
        this.image!.style.left = `${left + 12}px`;

        container?.append(this.image!);
      }

      let count = this.element.childNodes.length - 1;
      this.toyCounter.textContent = count.toString();
    } else {
      let count = this.element.childNodes.length - 1;
      this.toyCounter.textContent = count.toString();
    }
  }

  handleDragEnd() {
    this.image!.addEventListener('dragend', (event) => {
      this.dragEnd(event);
    });
    // this.image!.removeEventListener('dragend', this.dragEnd);
  }
}

export default FavoriteToy;
