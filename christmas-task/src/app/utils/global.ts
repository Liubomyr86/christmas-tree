import { IToyCardData } from './alias';

class State {
  private favorite: IToyCardData[] = [];
  private treeUrl: string = 'public/tree/1.png';
  private backgroundUrl: string = 'public/bg/1.jpg';
  private snowflakesClass: string = '';
  private dragX = 0;
  private dragY = 0;

  arrayPush(item?: IToyCardData) {
    if (item) this.favorite.push(item);
  }

  arrayPop(id?: string) {
    let i = 0;
    while (i < this.favorite.length) {
      if (this.favorite[i].num === id) {
        this.favorite.splice(i, 1);
      } else {
        ++i;
      }
    }
  }

  getArrayLength() {
    return this.favorite.length;
  }

  getArrayItems(array: IToyCardData[]) {
    return (array = this.favorite.slice());
  }

  setTreeUrl(path: string) {
    this.treeUrl = path;
    // console.log(this.treeUrl);
  }

  getTreeUrl() {
    return this.treeUrl;
  }

  setBackgroundUrl(path: string) {
    this.backgroundUrl = path;
    // console.log(this.backgroundUrl);
  }

  getBackgroundUrl() {
    return this.backgroundUrl;
  }

  getSnowflakesClass() {
    return this.snowflakesClass;
  }

  setSnowflakesClass(string: string) {
    this.snowflakesClass = string;
  }

  dragStart(event: DragEvent) {
    this.dragX =
      event.clientX - (<HTMLElement>event.target).getBoundingClientRect().left;

    this.dragY =
      event.clientY - (<HTMLElement>event.target).getBoundingClientRect().top;
    const id = (<HTMLElement>event.target).id;
    event.dataTransfer!.setData('text/plain', id);
  }

  overDrop(event: DragEvent) {
    event.preventDefault();
    if (event.type !== 'drop') return;
    const draggedId = event.dataTransfer!.getData('text/plain');
    const draggedEl = document.getElementById(draggedId);
    const draggedElHeight = draggedEl!.offsetHeight;

    draggedEl!.style.top = `${event.clientY - this.dragY - draggedElHeight}px`;
    draggedEl!.style.left = `${event.clientX - this.dragX}px`;
    (<HTMLElement>event.target).append(draggedEl!);
  }
}

export const state = new State();
