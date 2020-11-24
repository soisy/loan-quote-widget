import React from 'react';
import styled from 'styled-components';

const Text = styled.span`
    &&& {
        font-family: Helvetica, sans-serif;
        font-size: 0.96em;
        line-height: 1.5;
        font-weight: light;
        color: #565656;
    }
`;

const Highlight = styled.span`
    &&& {
        color: #44c774;
    }
`;

const Price = styled.span`
    &&& {
        font-weight: bold;
        font-size: 1.15em;
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
