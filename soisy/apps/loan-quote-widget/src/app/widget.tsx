import React from 'react';
import LoanQuoteWidgetConfig from '../../loan-quote-widget.config';
import styled from 'styled-components';

const StyledApp = styled.div`
`;

class SoisyLoanQuoteWidget extends React.Component<any, any> {
    async componentDidMount() {
        if (!this.props.shopId) {
            return;
        }

        const shop = await this.getShop(this.props.shopId);
        if (!shop.active) {
            return;
        }

        const loanQuote = await this.getLoanQuote(this.props.amount * 100, this.props.instalments, this.whichZeroInterestRate(shop));

        this.setState({
            isShopActive: shop.active,
            zeroInterestRate: this.props.zeroInterestRate ?? shop.zeroInterestRate,
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
            <StyledApp>
                € {this.state.loanQuoteAmount} per {this.props.instalments} con Soisy
            </StyledApp>
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

    whichZeroInterestRate(shop) {
        return this.props.zeroInterestRate ?? shop.zeroInterestRate
    }
}

export default SoisyLoanQuoteWidget;
