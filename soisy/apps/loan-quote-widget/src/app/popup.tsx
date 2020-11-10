import React from "react";
import InfoIcon from "../assets/info.svg";
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
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
`;

const PopupWrapper = styled.div`
    position: relative;
    z-index: 2;
    top: 15%;
    left: 50%;
    background-color: white;

    width: 500px;
    margin-left: -250px;
`;

const PopupContent = styled.div`
    padding: 40px;
`;


class Popup extends React.Component<any, any> {
    render() {
        const trigger = (<PopupTrigger onClick={(e) => this.handlePopup(e, true)}><img src={InfoIcon} alt="info"/></PopupTrigger>);
        const popup = (
            <PopupBg onClick={(e) => this.handlePopup(e, false)}>
                <PopupWrapper>
                    <PopupContent>ciao</PopupContent>
                </PopupWrapper>
            </PopupBg>
        );

        if (this.state && this.state.isPopupOpen) {
            return (
                <span>
                    {trigger}
                    {popup}
                </span>
            );
        }

        return trigger;
    }

    handlePopup(e, popupOpen: boolean) {
        e.stopPropagation();
        this.setState({
            isPopupOpen: popupOpen
        });
    }
}

export default Popup
