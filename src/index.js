'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// stylesheets
import css from '../assets/scss/styles.scss';

// main container
import App from './App';

ReactDOM.render(
  <App />, 
  document.querySelector('#app')
);
