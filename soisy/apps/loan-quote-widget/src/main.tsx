import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';

const soisyLoanQuotesWidgets = document.getElementsByClassName('soisy-loan-quote-widget');

for (let i = 0; i < soisyLoanQuotesWidgets.length; i++) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    soisyLoanQuotesWidgets[i]   
  );
}
