import React from 'react';
import LoanQuoteWidgetConfig from '../../loan-quote-widget.config';
import QuoteSentence from './sentence';
import Popup from "./popup";
import { SentenceLogo } from './logo';
import Convert from "./convert";

class SoisyLoanQuoteWidget extends React.Component<any, any> {
    async componentDidMount() {
        if (!this.props.shopId) {
            return;
        }

        const shop = await this.getShop(this.props.shopId);
        if (!shop.active) {
            return;
        }

        const loanQuote = await this.getLoanQuote(
            Convert.amountToEurocents(this.props.amount),
            this.props.instalments,
            this.whichZeroInterestRate(shop)
        );

        this.setState({
            isShopActive: shop.active,
            zeroInterestRate: this.whichZeroInterestRate(shop),
            maxInstalmentsNumber: shop.maxInstalmentsNumber,
            loanQuote: {
                amount: Convert.toCurrency(Convert.eurocentsToAmount(loanQuote.min.instalmentAmount)),
                interestRate: Convert.toCurrency(loanQuote.min.interestRate),
                apr: Convert.toCurrency(loanQuote.min.apr),
            }
        });
    }

    render() {
        if (!this.props.shopId) {
            return (<p>shopId parameter is invalid.</p>);
        }

        if (!this.props.amount) {
            return (<p>amount parameter is not set.</p>);
        }

        if (!this.props.instalments) {
            return (<p>instalments parameter is not set.</p>);
        }

        if (!this.state) {
            return (<span/>);
        }

        if (!this.state.isShopActive) {
            return (<p>shopId is not active.</p>);
        }

        if (this.props.instalments > this.state.maxInstalmentsNumber) {
            return (<p>instalments parameter is greater than shopId's maximum of {this.state.maxInstalmentsNumber}</p>);
        }

        return (
            <div>
                <QuoteSentence
                    amount={this.state.loanQuote.amount}
                    instalments={this.props.instalments}
                    zeroInterestRate={this.state.zeroInterestRate}
                />
                <SentenceLogo />
                <Popup
                    amount={this.state.loanQuote.amount}
                    instalments={this.props.instalments}
                    zeroInterestRate={this.state.zeroInterestRate}
                    interestRate={this.state.loanQuote.interestRate}
                    apr={this.state.loanQuote.apr}
                />
            </div>
        );
    }

    async getShop(shopId: string) {
        return fetch(LoanQuoteWidgetConfig.API_URL + '/shops/' + this.props.shopId)
            .then(res => res.json())
            .then(shop => {
                return shop
            });
    }


    async getLoanQuote(amount: number, instalmentsNumber: number, zeroInterestRate: boolean) {
        return fetch(LoanQuoteWidgetConfig.API_URL + '/shops/' + this.props.shopId + '/loan-quotes?amount='+amount+'&instalments='+instalmentsNumber+'&zeroInterestRate='+zeroInterestRate)
            .then(res => res.json())
            .then(quote => {
                return quote;
            });
    }

    whichZeroInterestRate(shop): boolean {
        return Convert.toBool(this.props.zeroInterestRate ?? shop.zeroInterestRate);
    }
}

export default SoisyLoanQuoteWidget;
