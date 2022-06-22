import React from 'react';
import {Text, Price} from '../assets/styled-components/sentence';

const QuoteSentence = (props) => {
    return (
        <Text>Esempio da <Price>{props.amount} €</Price> per <b>{props.instalments} mesi</b>{props.zeroInterestRate ? (<b> a tasso zero</b>) : ''} con</Text>
    );
}

export default QuoteSentence;
