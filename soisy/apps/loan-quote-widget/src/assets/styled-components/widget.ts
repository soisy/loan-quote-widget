import styled from "styled-components";

export const WidgetWrapper = styled.span`
    display: inline-block;
    font-family: Helvetica, sans-serif;
    line-height: 1;
    font-weight: 400;
    color: #565656;
    text-transform: none;

    *, *:before, *:after {
        box-sizing: border-box;
    }

    strong, b {
        font-weight: 600;
    }
`;
export const SentenceWrapper = styled.span`
    text-align: left;
    display: block;
`;
export const AprWrapper = styled.span`
    text-align: right;
    display: block;
    font-size: 10px;
    line-height: 12px;
`;
