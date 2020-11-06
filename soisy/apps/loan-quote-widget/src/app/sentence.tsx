import React from 'react';

const QuoteSentence = (props) => {
    return <span>€ {props.amount} per {props.instalments} mesi {props.zeroInterestRate ? 'a tasso zero con' : 'con'}</span>;
}

export default QuoteSentence;
