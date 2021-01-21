import React from 'react';
import styled from "styled-components";

import QuoteSentence from './sentence';
import Popup from "./popup";
import { SentenceLogo } from './logo';

const WidgetWrapper = styled.span`
    display: inline-block;

    *, *:before, *:after {
        margin: 0;
        padding: 0;
        float: none;
        box-sizing: border-box;
        font-family: Helvetica, sans-serif;
        font-size: 10px;
        line-height: 1;
        font-weight: 400;
        color: #565656;
        text-transform: none;
    }

    strong, b {
        font-weight: 600;
    }
`;
const SentenceWrapper = styled.span`
    text-align: left;
    display: block;
`;
const AprWrapper = styled.span`
    text-align: right;
    display: block;

    & {
        b, strong, span {
            font-size: 10px;
            line-height: 12px;
        }
    }
`;

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
