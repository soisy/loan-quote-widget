import React from 'react';
import styled from 'styled-components';

const Text = styled.span`
    &&&, &&& b, &&& strong, &&& span {
        font-size: 15px;
        line-height: 20px;
    }
`;

const Highlight = styled.span`
    &&& {
        color: #44c774;
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
        <Text>
            da <Price>{props.amount} €</Price> per <b>{props.instalments} mesi</b> {props.zeroInterestRate ? (<span><Highlight>senza interessi</Highlight> con</span>) : 'con'}
        </Text>
    );
}

export default QuoteSentence;
