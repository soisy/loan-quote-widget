import React from 'react';
import ReactDOM from 'react-dom';

import SoisyLoanQuoteWidget from './app/widget';

class Soisy {
    private constructor() {
        return;
    }

    static initWidgets(): void {
        const soisy = new Soisy();

        soisy.watchForWidgets();
        soisy.watchForAttributesMutations();
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
            observers.push(new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "attributes") {
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

    watchForWidgets() {
        let self = this;
        const soisyDomMutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    // @ts-ignore
                    const loanQuoteWidgets = mutation.target.querySelectorAll('soisy-loan-quote');

                    for (let i = 0; i < loanQuoteWidgets.length; i++) {
                        self.renderWidget(loanQuoteWidgets[i]);
                    }
                }
            });
        });

        soisyDomMutationObserver.observe(document.getElementsByTagName('body')[0], {
            subtree: true,
            childList: true
        });
    }
}

export default Soisy;
