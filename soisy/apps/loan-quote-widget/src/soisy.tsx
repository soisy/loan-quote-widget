import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import {ServerStyleSheet} from "styled-components";

import SoisyLoanQuote from './app/soisyloanquote';
import Widget from './app/widget';

class Soisy {
    private constructor() {
        return;
    }

    static initWidgets(): void {
        const soisy = new Soisy();

        soisy.watchForWidgets();
        soisy.watchForAttributesMutations();
    }

    createWidget(element): void {
        if (!!element.shadowRoot) {
            return;
        }

        element.attachShadow({ mode: 'open' });
        const config = this.getWidgetConfigFromAttributes(element);
        this.renderWidget(element.shadowRoot, config);
    }

    destroyWidget(element) {
        if(!element) {
            return;
        }
        ReactDOM.unmountComponentAtNode(element);
        element.innerHTML = '';
    }

    reloadWidget(element) {
        this.destroyWidget(element.shadowRoot);
        this.renderWidget(element.shadowRoot, this.getWidgetConfigFromAttributes(element));
    }

    renderWidget(element, config): void {
        if(!element) {
            return;
        }
        const sheet = new ServerStyleSheet();

        ReactDOMServer.renderToString(sheet.collectStyles(
            <Widget
                amount={config.amount}
                instalments={config.instalments}
                zeroInterestRate={config.zeroInterestRate}
                min="" max="" aprInfo=""
            />
        ));

        ReactDOM.render(
            <>
                <div dangerouslySetInnerHTML={{__html: sheet.getStyleTags()}}></div>
                <SoisyLoanQuote
                    shopId={config.shopId}
                    amount={config.amount}
                    instalments={config.instalments}
                    zeroInterestRate={config.zeroInterestRate}
                />
            </>,
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
                        self.reloadWidget(widgets[i]);
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
                if (this.hasNonSoisyNodeBeenMutated(mutation)) {
                    // @ts-ignore
                    const loanQuoteWidgets = mutation.target.querySelectorAll('soisy-loan-quote');

                    for (let i = 0; i < loanQuoteWidgets.length; i++) {
                        self.createWidget(loanQuoteWidgets[i]);
                    }
                }
            });
        });

        soisyDomMutationObserver.observe(document.getElementsByTagName('body')[0], {
            subtree: true,
            childList: true
        });
    }

    hasNonSoisyNodeBeenMutated(mutation) {
        return mutation.type === "childList" && mutation.target.tagName.toLowerCase() !== 'soisy-loan-quote';
    }
}

export default Soisy;
