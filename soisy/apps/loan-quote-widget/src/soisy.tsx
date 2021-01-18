import React from 'react';
import ReactDOM from 'react-dom';

import SoisyLoanQuoteWidget from './app/widget';

class Soisy {
    private constructor() {
        return;
    }

    static initWidgets(): void {
        const soisy = new Soisy();

        let currentIteration = 0;
        const maxIterations = 30;
        const tick = 100;

        const soisyInterval = setInterval(() => {
            if (currentIteration >= maxIterations) {
                clearInterval(soisyInterval);
                soisy.watchForAttributesMutations();
                return;
            }

            soisy.renderAllWidgets();
            currentIteration++;
        }, tick);

    }

    renderAllWidgets(): void {
        const soisyLoanQuotesWidgets = document.getElementsByTagName('soisy-loan-quote');
        for (let i = 0; i < soisyLoanQuotesWidgets.length; i++) {
            this.renderWidget(soisyLoanQuotesWidgets[i]);
        }
    }

    renderWidget(element): void {
        const config = this.getWidgetConfigFromAttributes(element);

        ReactDOM.render(
            <React.StrictMode>
                <SoisyLoanQuoteWidget
                    shopId={config.shopId}
                    amount={config.amount}
                    instalments={config.instalments}
                    zeroInterestRate={config.zeroInterestRate}
                />
            </React.StrictMode>,
            element
        );
    }

    getWidgetConfigFromAttributes(element) {
        return {
            shopId: element.attributes['shop-id'] ? element.attributes['shop-id'].value : null,
            amount: element.attributes['amount'] ? element.attributes['amount'].value : null,
            instalments: element.attributes['instalments'] ? element.attributes['instalments'].value : null,
            zeroInterestRate: element.attributes['zero-interest-rate'] ? element.attributes['zero-interest-rate'].value : null,
        }
    }

    watchForAttributesMutations(): void {
        const widgets = document.querySelectorAll('soisy-loan-quote');
        let self = this, observers = [];

        for (let i = 0; i < widgets.length; i++) {
            observers.push(new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type == "attributes") {
                        ReactDOM.unmountComponentAtNode(widgets[i]);
                        self.renderWidget(widgets[i]);
                    }
                });
            }));

        }

        for (let i = 0; i < observers.length; i++) {
            observers[i].observe(widgets[i], {
                attributes: true
            });
        }
    }
}

export default Soisy;
