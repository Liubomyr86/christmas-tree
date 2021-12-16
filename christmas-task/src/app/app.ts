import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ToysPage from './page/toys/ToysPage';

class App {
  root: HTMLElement;
  header: HTMLElement;
  main: HTMLElement;
  footer: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;
    this.header = new Header().element;
    this.main = new ToysPage().element;
    this.footer = new Footer().element;
  }

  start() {
    this.root.append(this.header);
    this.root.append(this.main);
    this.root.append(this.footer);
  }
}
export default App;
