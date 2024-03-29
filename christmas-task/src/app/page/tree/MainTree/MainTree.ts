import './_main-tree.scss';

import BaseElement from '../../../components/BaseElement';
import { storage } from '../../../utils/global';

class MainTree extends BaseElement {
  mapArea: HTMLElement;
  imageTree: HTMLImageElement;
  dragX: number = 0;
  dragY: number = 0;
  getCoordinates: () => number[];

  constructor(getCoordinates: () => number[]) {
    super('div', ['main-tree']);
    this.getCoordinates = getCoordinates;

    this.element.innerHTML = `
      <map name="tree-map">
        <area coords="365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664" shape="poly">
      </map>
      <img src="public/tree/1.png" class="main-tree__image" usemap="#tree-map" alt="tree">
    `;
    this.imageTree = this.element.querySelector('.main-tree__image')!;
    this.mapArea = this.element.querySelector('[name="tree-map"]')!;
    this.handleOverDrop();
    this.handleDrop();
    this.getTreeSrcFromLocalStorage();
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
    this.element.append(draggedEl!);
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

  changeSrc(src: string) {
    this.imageTree.src = src;
  }

  getTreeSrcFromLocalStorage() {
    if (storage.getItemFromLocalStorage('ct-treeImg')) {
      const treePath = storage.getItemFromLocalStorage('ct-treeImg');
      this.imageTree.src = treePath!;
    }
  }
}

export default MainTree;
