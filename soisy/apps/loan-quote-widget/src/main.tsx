import React from 'react';
import ReactDOM from 'react-dom';

import SoisyLoanQuoteWidget from './app/widget';

const soisyLoanQuotesWidgets = document.getElementsByTagName('soisy-loan-quote');

for (let i = 0; i < soisyLoanQuotesWidgets.length; i++) {
    const widgetConfig = {
        shopId: soisyLoanQuotesWidgets[i].attributes['shop-id'] ? soisyLoanQuotesWidgets[i].attributes['shop-id'].value : null,
        amount: soisyLoanQuotesWidgets[i].attributes['amount'] ? soisyLoanQuotesWidgets[i].attributes['amount'].value : null,
        installments: soisyLoanQuotesWidgets[i].attributes['installments'] ? soisyLoanQuotesWidgets[i].attributes['installments'].value : null,
        minInstallments: soisyLoanQuotesWidgets[i].attributes['min-installments'] ? soisyLoanQuotesWidgets[i].attributes['min-installments'].value : null,
        maxInstallments: soisyLoanQuotesWidgets[i].attributes['max-installments'] ? soisyLoanQuotesWidgets[i].attributes['max-installments'].value : null,
        zeroInterestRate: soisyLoanQuotesWidgets[i].attributes['zero-interest-rate'] ? soisyLoanQuotesWidgets[i].attributes['zero-interest-rate'].value : null,
    };

    ReactDOM.render(
        <React.StrictMode>
            <SoisyLoanQuoteWidget
                shopId={widgetConfig.shopId}
                amount={widgetConfig.amount}
                installments={widgetConfig.installments}
                minInstallments={widgetConfig.minInstallments}
                maxInstallments={widgetConfig.maxInstallments}
                zeroInterestRate={widgetConfig.zeroInterestRate}
            />
        </React.StrictMode>,
        soisyLoanQuotesWidgets[i]
    );
}
