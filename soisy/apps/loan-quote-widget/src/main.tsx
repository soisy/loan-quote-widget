import React from 'react';
import ReactDOM from 'react-dom';

import SoisyLoanQuoteWidget from './app/widget';

soisyWidgetInit();

function soisyWidgetInit() {
    let currentIteration = 0;
    const maxIterations = 5;
    const tick = 1000;

    const soisyInterval = setInterval(() => {
        if (currentIteration >= maxIterations) {
            clearInterval(soisyInterval);
            return;
        }

        renderSoisyWidgets();
        currentIteration++;
    }, tick);
}

function renderSoisyWidgets() {
    const soisyLoanQuotesWidgets = document.getElementsByTagName('soisy-loan-quote');
    for (let i = 0; i < soisyLoanQuotesWidgets.length; i++) {
        const widgetConfig = {
            shopId: soisyLoanQuotesWidgets[i].attributes['shop-id'] ? soisyLoanQuotesWidgets[i].attributes['shop-id'].value : null,
            amount: soisyLoanQuotesWidgets[i].attributes['amount'] ? soisyLoanQuotesWidgets[i].attributes['amount'].value : null,
            instalments: soisyLoanQuotesWidgets[i].attributes['instalments'] ? soisyLoanQuotesWidgets[i].attributes['instalments'].value : null,
            zeroInterestRate: soisyLoanQuotesWidgets[i].attributes['zero-interest-rate'] ? soisyLoanQuotesWidgets[i].attributes['zero-interest-rate'].value : null,
        };

        ReactDOM.render(
            <React.StrictMode>
                <SoisyLoanQuoteWidget
                    shopId={widgetConfig.shopId}
                    amount={widgetConfig.amount}
                    instalments={widgetConfig.instalments}
                    zeroInterestRate={widgetConfig.zeroInterestRate}
                />
            </React.StrictMode>,
            soisyLoanQuotesWidgets[i]
        );
    }
}
