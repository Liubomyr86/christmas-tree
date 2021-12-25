import BaseElement from './components/BaseElement';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './page/main/MainPage';
import { Router } from './router/Router';

class App {
  root: HTMLElement;
  header: HTMLElement;
  main: HTMLElement;
  footer: HTMLElement;
  router: Router;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;
    this.header = new Header().element;
    this.main = new MainPage().element;

    this.router = new Router(() => {
      this.main.innerHTML = '';
      this.main.appendChild(this.router.currentRoute?.component());
    });

    this.footer = new Footer().element;
  }

  start() {
    this.root.append(this.header);
    this.root.append(this.main!);
    this.root.append(this.footer);
  }
}
export default App;
