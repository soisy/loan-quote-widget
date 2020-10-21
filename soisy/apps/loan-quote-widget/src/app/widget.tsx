import React from 'react';

import styled from 'styled-components';

const StyledApp = styled.div`
`;

class SoisyLoanQuoteWidget extends React.Component<any, any> {
    render () {

        if (!this.props.shopId) {
            return (<p>shopId parameter is invalid.</p>);
        }

        return (
            <StyledApp>
                {this.props.shopId} <br/>
                {this.props.amount} <br/>
                {this.props.installments} <br/>
                {this.props.minInstallments} <br/>
                {this.props.maxInstallments} <br/>
                {this.props.zeroInterestRate} <br/>
            </StyledApp>
        );
    }
};

export default SoisyLoanQuoteWidget;
