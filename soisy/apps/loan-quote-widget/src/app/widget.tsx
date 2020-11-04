import React from 'react';

import styled from 'styled-components';

const StyledApp = styled.div`
`;

class SoisyLoanQuoteWidget extends React.Component<any, any> {
    componentDidMount() {
        if (!this.props.shopId) {
            return;
        }

        fetch(process.env.BASE_URL + '/shops/' + this.props.shopId)
            .then(res => res.json())
            .then(shop => {
                this.setState({
                    isShopActive: shop.active,
                    zeroInterestRate: shop.zeroInterestRate,
                    maxInstalments: shop.maxInstalmentsNumber
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

        return (
            <StyledApp>
                {this.props.shopId} <br/>
                {this.props.amount} <br/>
                {this.props.instalments} <br/>
                {this.props.zeroInterestRate} <br/>
            </StyledApp>
        );
    }
};

export default SoisyLoanQuoteWidget;
