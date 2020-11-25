import React from "react";
import styled from "styled-components";
import {PopupLogo} from "./logo";

const StyledContent = styled.div`
    &&& {
        padding: 40px;
    }
`;

const Caption = styled.span`
    &&& {
        font-family: Helvetica, sans-serif;
        font-size: 1.30em;
        line-height: 1.5;
        font-weight: light;
        color: #565656;
    }
`;

const SmallText = styled.span`
    &&& {
        font-family: Helvetica, sans-serif;
        font-size: 0.70em;
        line-height: 1.5;
        font-weight: light;
        color: #565656;

        a {
            color: #44c774;
            text-decoration: none;
        }
    }
`;

const LiText = styled.span`
    &&& {
        font-family: Helvetica, sans-serif;
        font-size: 0.95em;
        line-height: 1.5;
        font-weight: light;
        color: #565656;
    }
`;

const Highlight = styled.span`
    &&& {
        font-size: 1.0em;
        font-weight: light;
        color: #44c774;
    }
`;

const Price = styled.span`
    &&& {
        font-weight: bold;
        color: #44c774;
    }
`;

const MainUl = styled.ul`
    &&& {
        list-style: decimal;
        font-family: Helvetica, sans-serif;
        color: #565656;
        margin: 15px 0 15px 15px;

        & > li {
            margin: 15px 0 5px;
        }

        ul {
            margin: 0 0 0 20px;
            list-style: disc;

            & > li {
                margin: 5px 0;
            }
        }
    }
`;

const Separator = styled.div`
    &&& {
        height: 1px;
        background-color: #6a6a6a;
        padding: 0;
        margin: 20px 0;
        display: block;
    }
`;

const PopupContent = (props) => {
    return (
        <StyledContent>
            <Caption>
                Da <Price>{props.min.amount} €</Price> per <strong>{props.instalments} mesi</strong>
                {props.zeroInterestRate ? (<Highlight> senza interessi</Highlight>) : ''},
            </Caption>
            <br/>
            <SmallText>
                {
                    props.zeroInterestRate ? (
                            <span>
                                TAEG <b>{props.max.apr}%</b><br/>
                                Spesa complessiva <b>{props.max.totalRepaid}€</b>
                            </span>
                        ) : (
                            <span>
                                TAN da <b>{props.min.interestRate}%</b> a <b>{props.max.interestRate}%</b> - TAEG da <b>{props.min.apr}%</b> a <b>{props.max.apr}%</b> <br/>
                                Spesa complessiva da <b>{props.min.totalRepaid}€</b> a <b>{props.max.totalRepaid}€</b>
                            </span>
                        )
                }
            </SmallText>
            <MainUl>
                <li><LiText><strong>Metti in carrello i tuoi prodotti e scegli</strong></LiText> <PopupLogo /> <LiText>al <strong>checkout</strong></LiText></li>
                <li>
                    <LiText><strong>Ottieni l'esito in 3 minuti e tieni a portata di mano:</strong></LiText>
                    <ul>
                        <li><LiText>IBAN su cui addebitare i pagamenti mensili</LiText></li>
                        <li><LiText>documento di identità</LiText></li>
                        <li><LiText>tessera sanitaria (la chiediamo solo in alcuni casi)</LiText></li>
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
