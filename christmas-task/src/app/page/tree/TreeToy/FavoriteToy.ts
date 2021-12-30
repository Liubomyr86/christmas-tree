import './_favorite-toy.scss';

import BaseElement from '../../../components/BaseElement';
import { IToyCardData } from '../../../utils/alias';

class FavoriteToy extends BaseElement {
  toyCounter: HTMLElement;
  arr: number[];
  image: HTMLElement | undefined;
  setCoordinates: (x: number, y: number) => void;

  constructor(
    data: IToyCardData,
    setCoordinates: (x: number, y: number) => void
  ) {
    super('div', ['tree__favorite-toy', 'favorite-toy']);
    this.element.dataset.num = data.num;
    this.arr = this.convertNumberToArray(data.amount);
    this.setCoordinates = setCoordinates;

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
      this.image.dataset.location = '1';
      this.image.draggable = true;
      this.handlerDragStart();
      this.handleDragEnd();
    });
  }

  convertNumberToArray(num: string) {
    const number = +num;
    return Array.from(new Array(number), (x, i) => i + 1);
  }

  dragStart(event: DragEvent) {
    const dragX =
      event.clientX - (<HTMLElement>event.target).getBoundingClientRect().left;

    const dragY =
      event.clientY - (<HTMLElement>event.target).getBoundingClientRect().top;
    const id = (<HTMLElement>event.target).id;
    event.dataTransfer!.setData('text/plain', id);

    this.setCoordinates(dragX, dragY);
  }

  handlerDragStart() {
    this.image!.addEventListener('dragstart', (event) => {
      this.dragStart(event);
    });
  }

  dragEnd(event: DragEvent) {
    if (event.dataTransfer?.dropEffect === 'none') {
      if ((<HTMLElement>event.currentTarget).dataset.location === '2') {
        const elemData = (<HTMLElement>(
          event.currentTarget
        )).dataset.imgnum?.split('-');
        const container = document.querySelector(
          `[data-num="${elemData![0]}"]`
        );
        const top = (<HTMLElement>container!).offsetTop;
        const left = (<HTMLElement>container!).offsetLeft;

        (<HTMLElement>event.currentTarget).style.top = `${top + 12}px`;
        (<HTMLElement>event.currentTarget).style.left = `${left + 12}px`;

        container?.append(<HTMLElement>event.currentTarget);
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
  }
}

export default FavoriteToy;
