import React from "react";
import Svg from '../assets/soisy_logo.svg';
import styled from 'styled-components';

const SentenceLogoWrapper = styled.span`
    &&& {
        display: inline-block;
        height: 17px;
        width: 65px;
        text-align: center;

        img {
            position: static;
            max-width: 100%;
            max-height: 100%;
        }
    }
`;

const PopupLogoWrapper = styled.span`
    &&& {
        display: inline-block;
        width: 45px;
        text-align: center;
        border: 1px solid #7a7a7a;
        border-radius: 4px;
        padding: 4px;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
`;

const SentenceLogo = () => {
    return (<SentenceLogoWrapper><img src={Svg} alt="Soisy"/></SentenceLogoWrapper>);
};

const PopupLogo = () => {
    return (<PopupLogoWrapper><img src={Svg} alt="Soisy"/></PopupLogoWrapper>);
};

export {
    SentenceLogo,
    PopupLogo
};
