import BaseElement from '../components/BaseElement';
import Header from '../components/Header/Header';
import MainPage from '../page/main/MainPage';
import ToysPage from '../page/toys/ToysPage';
import TreePage from '../page/tree/Tree';

const hearder = new Header();

const ROUTING: { name: string; component: () => BaseElement }[] = [
  {
    name: '',
    component: () => new MainPage(hearder.changeLinkStyle),
  },
  {
    name: 'toys-page',
    component: () => new ToysPage(hearder.changeCount),
  },
  {
    name: 'tree-page',
    component: () => new TreePage(),
  },
];

export class Router {
  private currentRouteName: string;

  public currentComponent: BaseElement;

  private onRoute: () => void;

  constructor(onRoute: () => void) {
    this.currentRouteName = window.location.hash.slice(1);
    this.currentComponent = ROUTING.find(
      (page) => page.name === this.currentRouteName
    )!.component();
    this.onRoute = onRoute;
    this.initRoutes();
  }

  initRoutes(): void {
    window.onpopstate = () => {
      this.currentRouteName = window.location.hash.slice(1);
      this.currentComponent.cleanUp();
      this.currentComponent = ROUTING.find(
        (page) => page.name === this.currentRouteName
      )!.component();
      this.onRoute();
    };
  }
}
