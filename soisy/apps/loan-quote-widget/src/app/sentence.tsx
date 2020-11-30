import React from 'react';
import styled from 'styled-components';

const Text = styled.span`
    &&&, &&& b, &&& strong, &&& span {
        font-size: 15px;
        line-height: 20px;
    }

    &&& {
        display: inline-block;
        margin-right: 5px;
    }
`;

const Price = styled.span`
    &&& {
        font-weight: 600;
        font-size: 18px;
        line-height: 18px;
        color: #44c774;
    }
`;

const QuoteSentence = (props) => {
    return (
        <Text>da <Price>{props.amount} €</Price> per <b>{props.instalments} mesi</b>{props.zeroInterestRate ? (<b> senza interessi</b>) : ''} con</Text>
    );
}

export default QuoteSentence;
