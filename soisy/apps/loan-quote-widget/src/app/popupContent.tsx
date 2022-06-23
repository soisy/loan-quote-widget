import React from "react";

import {PopupLogo} from "./logo";
import {StyledContent, Caption, Price, Separator, Highlight, SmallText, MainList, MainListItem, LiText, SubList, SubListItem} from "../assets/styled-components/popupContent";

const PopupContent = (props) => {
    return (
        <StyledContent>
            <Caption>
                Es. Rata da <Price>{props.min.amount} €</Price> per <strong>{props.instalments} mesi</strong>
                {props.zeroInterestRate ? (<Highlight> a tasso zero</Highlight>) : ''},
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
