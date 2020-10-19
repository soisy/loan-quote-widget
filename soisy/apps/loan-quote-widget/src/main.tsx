import React from 'react';
import ReactDOM from 'react-dom';

import SoisyLoanQuoteWidget from './app/widget';

const soisyLoanQuotesWidgets = document.getElementsByTagName('soisy-loan-quote');

for (let i = 0; i < soisyLoanQuotesWidgets.length; i++) {
  ReactDOM.render(
    <React.StrictMode>
      <SoisyLoanQuoteWidget />
    </React.StrictMode>,
    soisyLoanQuotesWidgets[i]   
  );
}
