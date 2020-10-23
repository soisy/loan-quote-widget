import React from 'react';
import ReactDOM from 'react-dom';

import SoisyLoanQuoteWidget from './app/widget';

const soisyLoanQuotesWidgets = document.getElementsByTagName('soisy-loan-quote');

for (let i = 0; i < soisyLoanQuotesWidgets.length; i++) {
    const widgetConfig = {
        shopId: soisyLoanQuotesWidgets[i].attributes['shop-id'] ? soisyLoanQuotesWidgets[i].attributes['shop-id'].value : null,
        amount: soisyLoanQuotesWidgets[i].attributes['amount'] ? soisyLoanQuotesWidgets[i].attributes['amount'].value : null,
        instalments: soisyLoanQuotesWidgets[i].attributes['instalments'] ? soisyLoanQuotesWidgets[i].attributes['instalments'].value : null,
        minInstalments: soisyLoanQuotesWidgets[i].attributes['min-instalments'] ? soisyLoanQuotesWidgets[i].attributes['min-instalments'].value : null,
        maxInstalments: soisyLoanQuotesWidgets[i].attributes['max-instalments'] ? soisyLoanQuotesWidgets[i].attributes['max-instalments'].value : null,
        zeroInterestRate: soisyLoanQuotesWidgets[i].attributes['zero-interest-rate'] ? soisyLoanQuotesWidgets[i].attributes['zero-interest-rate'].value : null,
    };

    ReactDOM.render(
        <React.StrictMode>
            <SoisyLoanQuoteWidget
                shopId={widgetConfig.shopId}
                amount={widgetConfig.amount}
                instalments={widgetConfig.instalments}
                minInstalments={widgetConfig.minInstalments}
                maxInstalments={widgetConfig.maxInstalments}
                zeroInterestRate={widgetConfig.zeroInterestRate}
            />
        </React.StrictMode>,
        soisyLoanQuotesWidgets[i]
    );
}
