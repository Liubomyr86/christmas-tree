import './style.scss';
import App from './app/app';

const rootElement = document.getElementById('root');
const app = new App(rootElement);
app.start();
