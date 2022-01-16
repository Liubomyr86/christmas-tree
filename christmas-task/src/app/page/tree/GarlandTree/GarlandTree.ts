import './_garland-tree.scss';

import BaseElement from '../../../components/BaseElement';

class GarlandTree extends BaseElement {
  liItem: HTMLElement | undefined;
  garlandItems: number;
  startChunk = 0;
  endChunk = 2;
  middleChunk = 1;
  oldTotalChunk = 0;
  totalChunk = 0;
  chunk = 0;
  trnaslateY = 150;
  rotate = 0;
  minRotate = 0;

  constructor() {
    super('ul', ['garland__lightrope']);
    this.garlandItems = 63;

    for (let i = 0; i < this.garlandItems; i++) {
      this.totalChunk++;

      if (i < this.middleChunk) {
        this.liItem = new BaseElement('li', ['garland__lamp']).render(
          this.element
        );
        this.liItem.style.transform = `rotate(${(this.rotate += 3)}deg) translateY(${
          this.trnaslateY
        }px) `;
      } else if (i > this.middleChunk) {
        this.liItem = new BaseElement('li', ['garland__lamp']).render(
          this.element
        );
        this.liItem.style.transform = `rotate(${(this.minRotate -= 3)}deg) translateY(${
          this.trnaslateY
        }px)`;

        if (i === this.endChunk) {
          this.chunk = this.totalChunk - this.oldTotalChunk;
          this.oldTotalChunk = this.totalChunk;
          this.startChunk = this.endChunk + 1;
          this.endChunk = this.chunk + i + 2;

          this.middleChunk = Math.floor(
            (this.endChunk - this.startChunk) / 2 + this.startChunk
          );

          this.trnaslateY += 75;
          this.rotate = 0;
          this.minRotate = 0;
        }
      } else {
        this.liItem = new BaseElement('li', ['garland__lamp']).render(
          this.element
        );
        this.liItem.style.transform = `translateY(${this.trnaslateY}px)`;
      }
    }
  }

  swithGarland(color: string, flag: boolean) {
    if (flag) {
      this.element.className = `garland__lightrope ${color} visible`;
    } else {
      this.element.classList.remove('visible');
    }
  }
}

export default GarlandTree;
