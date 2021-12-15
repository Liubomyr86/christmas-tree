import './style.scss';
import App from './app/app';

const rootElement = document.getElementById('root');

if (!rootElement) throw Error('App root element not found');
const app = new App(rootElement);
app.start();
