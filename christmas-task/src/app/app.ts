import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './page/main/MainPage';
import ToysPage from './page/toys/ToysPage';
import { IToyCardData } from './utils/alias';

class App {
  root: HTMLElement;
  header: HTMLElement;
  main: HTMLElement;
  footer: HTMLElement;
  public favorite: IToyCardData[] = [];
  count: number = 0;
  basket: any;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;
    this.header = new Header().element;
    // this.main = new ToysPage(
    //   this.arrayPush.bind(this),
    //   this.arrayPop.bind(this),
    //   this.count
    // ).element;
    this.main = new MainPage().element;

    this.footer = new Footer().element;
    this.arrayPush();
    this.arrayPop();
  }

  start() {
    this.root.append(this.header);
    this.root.append(this.main);
    this.root.append(this.footer);
  }

  arrayPush(item?: IToyCardData) {
    if (item) this.favorite.push(item);
    this.count++;
    // console.log(this.favorite.length);
    console.log(this.count);
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
    this.count--;
    // console.log(this.favorite.length);
    console.log(this.count);

    // console.log(this.favorite);
  }
}
export default App;
