/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/loader.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
    button: document.querySelector('#menu'),
    drawer: document.querySelector('#drawer'),
    content: document.querySelector('#main-content'),
});

import './views/components/navbar.js';
import './views/components/hero.js';
import './views/components/footer.js';


window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
});