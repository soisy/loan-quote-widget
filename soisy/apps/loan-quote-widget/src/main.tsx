import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';

var widgets = document.getElementsByClassName('soisy-loan-quote-widget');
for (let i = 0; i < widgets.length; i++) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    widgets[i]   
  );
}
