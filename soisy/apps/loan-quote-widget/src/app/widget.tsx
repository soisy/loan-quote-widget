import React from 'react';

import styled from 'styled-components';

const StyledApp = styled.div`
`;

class SoisyLoanQuoteWidget extends React.Component<any, any> {
    componentDidMount() {
        if (!this.props.shopId) {
            return;
        }

        const shop = this.getShop();
        if (!shop) {
            return;
        }

        this.setState({
            isShopActive: shop.active,
            maxInstalments: shop.maxInstalmentsNumber
        });
    }

    render () {
        if (!this.props.shopId) {
            return (<p>shopId parameter is invalid.</p>);
        }

        if (!this.props.amount) {
            return (<p>amount parameter is not set.</p>);
        }

        if (!this.state.isShopActive) {
            return (<p>shopId is not active.</p>);
        }

        return (
            <StyledApp>
                {this.props.shopId} <br/>
                {this.props.amount} <br/>
                {this.props.instalments} <br/>
                {this.props.minInstalments} <br/>
                {this.props.maxInstalments} <br/>
                {this.props.zeroInterestRate} <br/>
            </StyledApp>
        );
    }

    async getShop() {
        try {
            const response = await fetch('https://api.sandbox.soisy.it/api/shops/' + this.props.shopId);
            return await response.json();
        } catch (e) {
            return undefined;
        }
    }
};

export default SoisyLoanQuoteWidget;
