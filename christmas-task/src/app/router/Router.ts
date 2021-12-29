import MainPage from '../page/main/MainPage';
import ToysPage from '../page/toys/ToysPage';
import TreePage from '../page/tree/Tree';
import { IToyCardData } from '../utils/alias';

const DEFAULT_ROUTE: { name: string; component: () => void } = {
  name: 'default',
  component: () => new MainPage().element,
};

const ROUTING: { name: string; component: () => void }[] = [
  {
    name: 'main-page',
    component: () => new MainPage().element,
  },
  {
    name: 'toys-page',
    component: () => new ToysPage().element,
  },
  {
    name: 'tree-page',
    component: () => new TreePage().element,
  },
];

export class Router {
  private currentRouteName: string;

  public currentRoute: { name: string; component: Function } | undefined;

  private onRoute: () => void;

  constructor(onRoute: () => void) {
    this.currentRouteName = 'default';
    this.currentRoute = DEFAULT_ROUTE;
    this.onRoute = onRoute;
    this.initRoutes();
  }

  initRoutes(): void {
    window.onpopstate = () => {
      // this.currentRouteName.getURL();
      this.currentRouteName = window.location.hash.slice(1);
      // console.log(this.currentRouteName);
      this.currentRoute = ROUTING.find(
        (page) => page.name === this.currentRouteName
      );
      this.onRoute();
      return this.currentRoute;
    };
  }
}
