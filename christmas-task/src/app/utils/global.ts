import { IToyCardData } from './alias';

class State {
  private favorite: IToyCardData[] = [];
  private treeUrl: string = 'public/tree/1.png';
  private backgroundUrl: string = 'public/bg/1.jpg';
  private snowflakesClass: string = '';

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
  }

  getTreeUrl() {
    return this.treeUrl;
  }

  setBackgroundUrl(path: string) {
    this.backgroundUrl = path;
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
}

export const state = new State();
