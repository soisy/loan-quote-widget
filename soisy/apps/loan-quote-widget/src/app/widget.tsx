import React from 'react';
import LoanQuoteWidgetConfig from '../../loan-quote-widget.config';
import styled from 'styled-components';

const StyledApp = styled.div`
`;

class SoisyLoanQuoteWidget extends React.Component<any, any> {
    componentDidMount() {
        if (!this.props.shopId) {
            return;
        }

        fetch(LoanQuoteWidgetConfig.API_URL + '/shops/' + this.props.shopId)
            .then(res => res.json())
            .then(shop => {
                this.setState({
                    isShopActive: shop.active,
                    zeroInterestRate: this.props.zeroInterestRate ?? shop.zeroInterestRate,
                    maxInstalmentsNumber: shop.maxInstalmentsNumber
                })
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

        // fetch(process.env.BASE_URL + '/shops/' + this.props.shopId + '/loan-quote?amount=120000&instalments=6&zeroInterestRate=false')
        //     .then(res => res.json())
        //     .then(shop => {
        //
        //     });

        return (
            <StyledApp>
                {this.props.shopId} <br/>
                {this.props.amount} <br/>
                {this.props.instalments} <br/>
                {this.props.zeroInterestRate} <br/>
            </StyledApp>
        );
    }

    async getLoanQuoteBy(amount: number) {
        return 0;
    }
};

export default SoisyLoanQuoteWidget;
