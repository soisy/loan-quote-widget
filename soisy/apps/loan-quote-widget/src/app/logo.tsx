import React from "react";

import Svg from '../assets/soisy_logo.svg';
import {SentenceLogoWrapper, PopupLogoWrapper} from "../assets/styled-components/logo";

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
