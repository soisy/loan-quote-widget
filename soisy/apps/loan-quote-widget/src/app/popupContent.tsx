import React from "react";
import styled from "styled-components";
import {PopupLogo, SentenceLogo} from "./logo";

const StyledContent = styled.div`
    padding: 40px;
`;

const Caption = styled.span`
    font-family: Helvetica, sans-serif;
    font-size: 1.0em;
    line-height: 1.5;
    font-weight: light;
    color: #565656;
`;

const SmallText = styled.span`
    font-family: Helvetica, sans-serif;
    font-size: 0.75em;
    line-height: 1.5;
    font-weight: light;
    color: #565656;

    a {
        color: #44c774;
        text-decoration: none;
    }
`;

const LiText = styled.span`
    font-family: Helvetica, sans-serif;
    font-size: 0.95em;
    line-height: 1.5;
    font-weight: light;
    color: #565656;
`;

const Highlight = styled.span`
    font-size: 1.0em;
    font-weight: light;
    color: #44c774;
`;

const HighlightBold = styled.span`
    font-size: 1.0em;
    font-weight: bold;
    color: #44c774;
`;

const MainUl = styled.ul`
    list-style: decimal;
    font-family: Helvetica, sans-serif;
    color: #565656;

    ul {
        list-style: lower-alpha;
    }
`;

const Separator = styled.div`
    height: 1px;
    background-color: #6a6a6a;
    padding: 0;
    margin: 20px 0;
`;

const PopupContent = (props) => {
    return (
        <StyledContent>
            <Caption>
                A partire da € <HighlightBold>{props.amount}</HighlightBold> per <strong>{props.instalments} mesi</strong>
                {props.zeroInterestRate ? (<Highlight> senza interessi</Highlight>) : ''},
            </Caption>
            <br/>
            <SmallText>TAEG da {props.apr}% e TAN da {props.interestRate}% con il pagamento rateale <SentenceLogo /></SmallText>
            <MainUl>
                <li><LiText><strong>Metti in carrello i tuoi prodotti e scegli</strong></LiText> <PopupLogo /> <LiText><strong>checkout</strong></LiText></li>
                <li>
                    <LiText><strong>Ottieni l'esito in 3 minuti e tieni a portata di mano:</strong></LiText>
                    <ul>
                        <li><LiText>foto del tuo documento d'identità fronte/retro</LiText></li>
                        <li><LiText>foto/selfie con questo documento in mano</LiText></li>
                        <li><LiText>foto del codice fiscale fronte/retro</LiText></li>
                        <li><LiText>IBAN su cui addebitare i pagamenti mensili</LiText></li>
                    </ul>
                </li>
                <li>
                    <LiText>
                        <strong>
                            Goditi il tuo acquisto 🛒: <br/>
                            inizierai a pagarlo dopo 30 giorni!
                        </strong>
                    </LiText>
                </li>
            </MainUl>

            <Separator />

            <SmallText>
                Pagamento soggetto a valutazione di sostenibilità creditizia e approvazione da parte di Soisy. Per maggiori informazioni visitare <a
                href="https://www.soisy.it/pagare-a-rate/" target="_blank">https://www.soisy.it/pagare-a-rate/</a>
            </SmallText>
        </StyledContent>
    );
}

export default PopupContent;
