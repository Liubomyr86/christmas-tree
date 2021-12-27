import { IToyCardData } from './alias';

class State {
  private favorite: IToyCardData[] = [];

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
    return (array = this.favorite.slice(0));
  }
}

export const state = new State();
