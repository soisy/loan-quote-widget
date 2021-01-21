import React from "react";
import InfoIcon from "../assets/info.svg";

import {PopupBg, PopupTrigger, PopupWrapper, ClosingMark, ClosingButton} from '../assets/styled-components/popup';
import PopupContent from "./popupContent";

class Popup extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            isPopupOpen: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClickAndTogglePopup = this.handleClickAndTogglePopup.bind(this);
    }

    render() {
        const trigger = (
            <PopupTrigger onClick={this.handleClickAndTogglePopup}><img src={InfoIcon} alt="info"/></PopupTrigger>);
        const popup = (
            <PopupBg onClick={this.handleClickAndTogglePopup}>
                <PopupWrapper onClick={this.handleClick}>
                    <ClosingMark onClick={this.handleClickAndTogglePopup}>×</ClosingMark>
                    <PopupContent
                        instalments={this.props.instalments}
                        zeroInterestRate={this.props.zeroInterestRate}
                        min={this.props.min}
                        max={this.props.max}
                    />
                    <ClosingButton onClick={this.handleClickAndTogglePopup}>Chiudi</ClosingButton>
                </PopupWrapper>
            </PopupBg>
        );

        if (this.state.isPopupOpen) {
            return (
                <>
                    {trigger}
                    {popup}
                </>
            );
        }

        return (
            <>
                {trigger}
                <span style={{display: "none"}}>{popup}</span>
            </>
        );
    }

    handleClick(e) {
        e.stopPropagation();
    }

    handleClickAndTogglePopup(e) {
        this.handleClick(e);
        this.togglePopup();
    }

    togglePopup() {
        this.setState({
            isPopupOpen: !this.state.isPopupOpen
        });
    }
}

export default Popup
