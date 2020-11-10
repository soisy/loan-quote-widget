import React from 'react';
import styled from 'styled-components';
import Convert from "./convert";

const Text = styled.span`
    font-family: Helvetica, sans-serif;
    font-size: 1.1em;
    line-height: 1.5;
    font-weight: light;
    color: #565656;
`;

const Highlight = styled.span`
    font-size: 1.3em;
    font-weight: bold;
    color: #44c774;
`;

const QuoteSentence = (props) => {
    return (
        <Text>
            € <Highlight>{Convert.toCurrency(props.amount)}</Highlight> per {props.instalments} mesi {props.zeroInterestRate ? 'a tasso zero con' : 'con'}
        </Text>
    );
}

export default QuoteSentence;
