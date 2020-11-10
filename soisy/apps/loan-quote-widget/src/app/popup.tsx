import React from "react";
import InfoIcon from "../assets/info.svg";
import PopupContent from "./popupContent";
import styled from "styled-components";
import Convert from "./convert";

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
    border: 3px solid #545454;

    width: 400px;
    margin-left: -250px;
`;

const ClosingMark = styled.span`
    color: #767676;
    font-size: 1.1em;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    padding: 10px 15px;
    cursor: pointer;
`;

class Popup extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            isPopupOpen: false
        }
    }

    render() {
        const trigger = (
            <PopupTrigger onClick={() => this.togglePopup(true)}><img src={InfoIcon} alt="info"/></PopupTrigger>);
        const popup = (
            <PopupBg onClick={() => this.togglePopup(false)}>
                <PopupWrapper>
                    <ClosingMark>×</ClosingMark>
                    <PopupContent
                        onClick={(e) => e.stopPropagation()}
                        amount={Convert.toCurrency(this.props.amount)}
                        instalments={this.props.instalments}
                        zeroInterestRate={this.props.zeroInterestRate} />
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

    togglePopup(popupOpen = false) {
        this.setState({
            isPopupOpen: popupOpen
        });
    }
}

export default Popup
