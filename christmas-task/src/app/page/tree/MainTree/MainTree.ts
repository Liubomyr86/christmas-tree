import './_main-tree.scss';

import BaseElement from '../../../components/BaseElement';
import { state } from '../../../utils/global';

class MainTree extends BaseElement {
  mapArea: HTMLElement;
  src: string;
  imageTree: HTMLImageElement;
  dragX: number = 0;
  dragY: number = 0;
  getCoordinates: () => number[];

  constructor(getCoordinates: () => number[]) {
    super('div', ['tree__main-tree']);
    this.src = state.getTreeUrl();
    this.getCoordinates = getCoordinates;

    this.element.innerHTML = `
      <map name="tree-map">
        <area coords="365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664" shape="poly">
      </map>
      <img src="${this.src}" class="main-tree" usemap="#tree-map" alt="tree">
    `;
    this.imageTree = this.element.querySelector('.main-tree')!;
    this.mapArea = this.element.querySelector('[name="tree-map"]')!;
    this.changeSrcImage(this.imageTree);
    this.handleOverDrop();
    this.handleDrop();
  }

  changeSrcImage(elem: HTMLImageElement) {
    setInterval(() => {
      elem.src = state.getTreeUrl();
    }, 100);
  }

  overDrop(event: DragEvent) {
    event.preventDefault();
    if (event.type !== 'drop') return;
    const draggedId = event.dataTransfer!.getData('text/plain');
    const draggedEl = document.getElementById(draggedId);
    const draggedElHeight = draggedEl!.offsetHeight;

    draggedEl!.dataset.location = '2';
    draggedEl!.style.top = `${event.clientY - this.dragY - draggedElHeight}px`;
    draggedEl!.style.left = `${event.clientX - this.dragX}px`;
    (<HTMLElement>event.target).append(draggedEl!);
  }

  handleOverDrop() {
    this.mapArea.addEventListener('dragover', (event) => {
      this.overDrop(event);
    });
  }

  handleDrop() {
    this.mapArea.addEventListener('drop', (event) => {
      [this.dragX, this.dragY] = this.getCoordinates();

      this.overDrop(event);
    });
  }
}

export default MainTree;
