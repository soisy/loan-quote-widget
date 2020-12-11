import React from "react";
import styled from "styled-components";
import {PopupLogo} from "./logo";

const StyledContent = styled.div`
    &&& {
        padding: 40px;

        @media screen (min-width: 720px) {
            padding: 40px 40px 0 40px;
        }
    }
`;

const Caption = styled.span`
    &&&, &&& b, &&& strong, &&& span {
        font-size: 21px;
        line-height: 31px;
    }
`;

const SmallText = styled.span`
    &&&, &&& b, &&& strong, &&& span {
        font-size: 11px;
        line-height: 12px;
    }

    &&& a {
        color: #44c774;
        text-decoration: none;
    }
`;

const LiText = styled.span`
    &&&, &&& b, &&& strong, &&& span {
        font-size: 15px;
    }

    &&& {
        font-weight: 400;
    }
`;

const Highlight = styled.span`
    &&& {
        font-size: 16px;
        font-weight: 400;
        color: #44c774;
    }
`;

const Price = styled.span`
    &&& {
        font-weight: bold;
        color: #44c774;
    }
`;

const MainList = styled.span`
    &&& {
        display: block;
        margin: 15px 0 15px 15px;
        padding: 0;
        border: none;
    }
`;

const SubList = styled.span`
    &&& {
        display: block;
        margin: 0 0 0 20px;
        padding: 0;
        border: none;
    }
`;

const MainListItem = styled.span`
    &&& {
        display: list-item;
        list-style-type: decimal;
        margin: 15px 0 5px;
        font-size: 15px;
        line-height: 1;
        padding: 0;
        border: none;
    }
`;

const SubListItem = styled.li`
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
            <MainList>
                <MainListItem>
                    <LiText><strong>Metti in carrello i tuoi prodotti e scegli</strong></LiText> <PopupLogo /> <LiText>al <strong>checkout</strong></LiText>
                </MainListItem>
                <MainListItem>
                    <LiText><strong>Ottieni l'esito in 3 minuti e tieni a portata di mano:</strong></LiText>
                    <SubList>
                        <SubListItem><LiText>IBAN su cui addebitare i pagamenti mensili</LiText></SubListItem>
                        <SubListItem><LiText>documento di identità</LiText></SubListItem>
                        <SubListItem><LiText>tessera sanitaria (la chiediamo solo in alcuni casi)</LiText></SubListItem>
                    </SubList>
                </MainListItem>
                <MainListItem>
                    <LiText>
                        <strong>
                            Goditi il tuo acquisto 🛒: <br/>
                            inizierai a pagarlo dopo 30 giorni!
                        </strong>
                    </LiText>
                </MainListItem>
            </MainList>

            <Separator />

            <SmallText>
                Pagamento soggetto a valutazione di sostenibilità creditizia e approvazione da parte di Soisy. Per maggiori informazioni visitare <a
                href="https://www.soisy.it/pagare-a-rate/" target="_blank">https://www.soisy.it/pagare-a-rate/</a>
            </SmallText>
        </StyledContent>
    );
}

export default PopupContent;
