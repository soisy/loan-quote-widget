import styled from "styled-components";

export const StyledContent = styled.div`
    padding: 40px;

    font-family: Helvetica, sans-serif;
    line-height: 1;
    font-weight: 400;
    color: #565656;

    @media screen (min-width: 720px) {
        padding: 40px 40px 0 40px;
    }
`;

export const Caption = styled.span`
    &&&, &&& b, &&& strong, &&& span {
        font-size: 21px;
        line-height: 31px;
    }
`;

export const SmallText = styled.span`
    &&&, &&& b, &&& strong, &&& span {
        font-size: 11px;
        line-height: 12px;
    }

    &&& a {
        color: #44c774;
        text-decoration: none;
    }
`;

export const LiText = styled.span`
    &&&, &&& b, &&& strong, &&& span {
        font-size: 15px;
    }

    &&& {
        font-weight: 400;
    }
`;

export const Highlight = styled.span`
    &&& {
        font-size: 16px;
        font-weight: 400;
        color: #44c774;
    }
`;

export const Price = styled.span`
    &&& {
        font-weight: bold;
        color: #44c774;
    }
`;

export const MainList = styled.span`
    &&& {
        display: block;
        margin: 15px 0 15px 15px;
        padding: 0;
        border: none;
        counter-reset: soisy;
    }
`;

export const SubList = styled.span`
    &&& {
        display: block;
        margin: 0 0 0 20px;
        padding: 0;
        border: none;
    }
`;

export const MainListItem = styled.span`
    &&& {
        display: list-item;
        list-style-type: none;
        margin: 15px 0 5px;
        padding: 0;
        border: none;
        position: relative;

        &::before {
            counter-increment: soisy;
            content: counter(soisy) ". ";
            font-size: 15px;
            line-height: 1;
            position: absolute;
            left: -15px;
            top: 0;
        }
    }
`;

export const SubListItem = styled.span`
    &&& {
        display: list-item;
        list-style-type: disc;
        margin: 5px 0;
        font-size: 15px;
        line-height: 1;
        padding: 0;
        border: none;
    }
`;

export const Separator = styled.div`
    &&& {
        height: 1px;
        background-color: #6a6a6a;
        padding: 0;
        margin: 20px 0;
        display: block;
    }
`;
