import React from "react";
import Svg from '../assets/soisy_logo.svg';
import styled from 'styled-components';

const SentenceLogoWrapper = styled.div`
    display: inline-block;
    height: 16px;
    width: 75px;
    text-align: center;

    img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const SentenceLogo = () => {
    return (<SentenceLogoWrapper><img src={Svg} alt="Soisy"/></SentenceLogoWrapper>);
};

export {
    SentenceLogo
};
