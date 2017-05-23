'use strict';

import './assets/stylesheets/styles.scss';

import React from 'react'; // import the main react dependency
import ReactDOM from 'react-dom'; // import reactDOM
import App from './app/app.jsx'; // import the main app component

ReactDOM.render(<App />, document.getElementById('root')); // render our App component and mount it to our #root