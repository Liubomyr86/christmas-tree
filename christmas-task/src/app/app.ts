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
    this.header = new Header().render();
    this.main = new ToysPage().render();
    this.footer = new Footer().render();
  }

  start() {
    this.root.append(this.header);
    this.root.append(this.main);
    this.root.append(this.footer);
  }
}
export default App;
