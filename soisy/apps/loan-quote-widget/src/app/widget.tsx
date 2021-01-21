import React from 'react';

import QuoteSentence from './sentence';
import Popup from "./popup";
import { SentenceLogo } from './logo';

import {WidgetWrapper, SentenceWrapper, AprWrapper} from '../assets/styled-components/widget';

const Widget = (props) => {
    return (
        <WidgetWrapper>
            <SentenceWrapper>
                <QuoteSentence
                    amount={props.amount}
                    instalments={props.instalments}
                    zeroInterestRate={props.zeroInterestRate}
                />
                <SentenceLogo />
                <Popup
                    instalments={props.instalments}
                    zeroInterestRate={props.zeroInterestRate}
                    min={props.min}
                    max={props.max}
                />
            </SentenceWrapper>
            <AprWrapper>
                {props.aprInfo}
            </AprWrapper>
        </WidgetWrapper>
    );
}

export default Widget;
