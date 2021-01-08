import React from "react";
import InfoIcon from "../assets/info.svg";
import PopupContent from "./popupContent";
import styled from "styled-components";

const PopupTrigger = styled.div`
    display: inline-block;
    height: 12px;
    width: 12px;
    text-align: center;
    cursor: pointer;

    img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const PopupBg = styled.div`
    &&& {
        position: fixed;
        z-index: 999999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
    }
`;

const PopupWrapper = styled.div`
    &&& {
        position: relative;
        z-index: 2;
        top: 0;
        left: 0;
        background-color: white;
        border: 3px solid #545454;

        width: 100%;
        height: 100%;

        @media screen and (min-width: 500px) {
            top: 5%;
            left: 50%;
            width: 500px;
            height: auto;
            margin-left: -250px;
        }
    }
`;

const ClosingMark = styled.span`
    &&& {
        color: #767676;
        font-size: 17.5px;
        line-height: 17.5px;
        position: absolute;
        z-index: 10;
        top: 0;
        right: 0;
        padding: 10px 15px;
        cursor: pointer;
    }
`;

const ClosingButton = styled.span`
    &&& {
        display: block;

        @media screen and (min-width: 720px) {
            display: none;
        }

        padding: 15px;
        text-align: center;
        text-transform: uppercase;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        line-height: 14px;
        background-color: #44c774;
        margin: 0 20px 20px 20px;
        opacity: 0.8;
        cursor: pointer;
        transition: opacity 0.3s;
        border-radius: 6px;

        &:hover, &:focus {
            opacity: 1;
        }
    }
`;

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
                <span>
                    {trigger}
                    {popup}
                </span>
            );
        }

        return trigger;
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
