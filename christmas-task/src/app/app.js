import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ToysPage from './page/toys/ToysPage';

class App {
  constructor(rootElement) {
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
