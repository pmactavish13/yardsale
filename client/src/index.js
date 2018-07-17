// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// // import App from './App';
import { makeMainRoutes } from './host';
// import registerServiceWorker from './registerServiceWorker';
// import './index.css';
// // import 'bootstrap/dist/css/bootstrap.css';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
