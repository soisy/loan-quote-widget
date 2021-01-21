import styled from "styled-components";

export const PopupTrigger = styled.div`
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

export const PopupBg = styled.div`
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
`;

export const PopupWrapper = styled.div`
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
`;

export const ClosingMark = styled.span`
    color: #767676;
    font-size: 17.5px;
    line-height: 17.5px;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    padding: 10px 15px;
    cursor: pointer;
`;

export const ClosingButton = styled.span`
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
`;
