import BaseElement from './components/BaseElement';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './page/main/MainPage';
import { Router } from './router/Router';

class App {
  root: HTMLElement;
  header: Header;
  main: HTMLElement | undefined;
  footer: HTMLElement;
  router: Router;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;
    this.header = new Header();
    this.header.element;
    this.main = new MainPage(this.header.changeLinkStyle.bind(this)).element;

    this.router = new Router(this.onRoute.bind(this));

    this.footer = new Footer().element;
    this.onRoute();
  }

  start() {
    this.root.append(this.header.element);
    this.root.append(this.main!);
    this.root.append(this.footer);
  }

  onRoute() {
    this.main!.innerHTML = '';
    this.main!.appendChild(this.router.currentComponent.element);
  }
}
export default App;
