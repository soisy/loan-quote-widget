import React from 'react';
import LoanQuoteWidgetConfig from '../../loan-quote-widget.config';
import QuoteSentence from './sentence';
import { SentenceLogo } from './logo';

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
            this.amountToEurocents(this.props.amount),
            this.props.instalments,
            this.whichZeroInterestRate(shop)
        );

        this.setState({
            isShopActive: shop.active,
            zeroInterestRate: this.whichZeroInterestRate(shop),
            maxInstalmentsNumber: shop.maxInstalmentsNumber,
            loanQuoteAmount: loanQuote.median.instalmentAmount
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
                    amount={this.state.loanQuoteAmount}
                    instalments={this.props.instalments}
                    zeroInterestRate={this.state.zeroInterestRate} />
                <SentenceLogo />
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
        return this.getBool(this.props.zeroInterestRate ?? shop.zeroInterestRate);
    }

    amountToEurocents(amount: number): number {
        return amount * 100;
    }

    eurocentsToAmount(eurocents: number): number {
        return eurocents / 100;
    }

    getBool(param: any): boolean {
        switch (param) {
            case true:
            case 1:
            case '1':
            case 'true':
            case 'on':
            case 'yes':
                return true;

            default:
                return false;
        }
    }
}

export default SoisyLoanQuoteWidget;
