import React from 'react';
import styled from "styled-components";
import LoanQuoteWidgetConfig from '../../loan-quote-widget.config';
import QuoteSentence from './sentence';
import Popup from "./popup";
import { SentenceLogo } from './logo';
import Convert from "./convert";

const WidgetWrapper = styled.span`
    &&, && *, && *:before, && *:after {
        margin: 0;
        padding: 0;
        float: none;
        box-sizing: border-box;
        font-family: Helvetica, sans-serif;
        font-size: 10px;
        line-height: 1;
        font-weight: 400;
        color: #565656;
        text-transform: none;
    }

    && {
        display: inline-block;
    }

    && strong, && b {
        font-weight: 600;
    }
`;

const SentenceWrapper = styled.span`
    &&& {
        text-align: left;
        display: block;
    }
`;

const AprWrapper = styled.span`
    &&& {
        text-align: right;
        display: block;
    }

    &&&, &&& b, &&& strong, &&& span {
        font-size: 10px;
        line-height: 12px;
    }
`;

class SoisyLoanQuoteWidget extends React.Component<any, any> {
    async componentDidMount() {
        if (!this.props.shopId) {
            return;
        }

        const shop = await this.getShop(this.props.shopId);
        if (!shop.active) {
            this.setState({active: false});
            return;
        }

        const loanQuote = await this.getLoanQuote(
            Convert.amountToEurocents(this.props.amount),
            this.whichInstalmentsAmount(this.props.instalments, shop.maxLoanInstalmentsNumber),
            this.whichZeroInterestRate(shop)
        );

        this.setState({
            isShopActive: shop.active,
            zeroInterestRate: this.whichZeroInterestRate(shop),
            instalments: this.whichInstalmentsAmount(this.props.instalments, shop.maxLoanInstalmentsNumber),
            maxLoanInstalmentsNumber: shop.maxLoanInstalmentsNumber,
            loanQuote: {
                min: {
                    amount: Convert.toReadableNumber(Convert.eurocentsToAmount(loanQuote.min.instalmentAmount)),
                    totalRepaid: Convert.toReadableNumber(Convert.eurocentsToAmount(loanQuote.min.totalRepaid)),
                    interestRate: Convert.toReadableNumber(loanQuote.min.interestRate),
                    apr: Convert.toReadableNumber(loanQuote.min.apr),
                },
                max: {
                    amount: Convert.toReadableNumber(Convert.eurocentsToAmount(loanQuote.max.instalmentAmount)),
                    totalRepaid: Convert.toReadableNumber(Convert.eurocentsToAmount(loanQuote.max.totalRepaid)),
                    interestRate: Convert.toReadableNumber(loanQuote.max.interestRate),
                    apr: Convert.toReadableNumber(loanQuote.max.apr),
                }
            }
        });
    }

    render() {
        if (!this.props.shopId) {
            return (<p>shopId parameter is invalid.</p>);
        }

        if (!this.props.amount) {
            return (<p>amount parameter is not set.</p>);
        }

        if (!this.state) {
            return (<span/>);
        }

        if (!this.state.isShopActive) {
            return (<p>shopId is not active.</p>);
        }

        return (
            <WidgetWrapper>
                <SentenceWrapper>
                    <QuoteSentence
                        amount={this.state.loanQuote.min.amount}
                        instalments={this.state.instalments}
                        zeroInterestRate={this.state.zeroInterestRate}
                    />
                    <SentenceLogo />
                    <Popup
                        instalments={this.state.instalments}
                        zeroInterestRate={this.state.zeroInterestRate}
                        min={this.state.loanQuote.min}
                        max={this.state.loanQuote.max}
                    />
                </SentenceWrapper>
                <AprWrapper>
                    {this.outputAprInfo()}
                </AprWrapper>
            </WidgetWrapper>
        );
    }

    async getShop(shopId: string) {
        return fetch(LoanQuoteWidgetConfig.API_URL + '/shops/' + this.props.shopId)
            .then(res => res.json())
            .then(shop => {
                return shop
            });
    }


    async getLoanQuote(amount: number, instalmentsNumber: number, zeroInterestRate: boolean) {
        return fetch(LoanQuoteWidgetConfig.API_URL + '/shops/' + this.props.shopId + '/loan-quotes?amount='+amount+'&instalments='+instalmentsNumber+'&zeroInterestRate='+zeroInterestRate)
            .then(res => res.json())
            .then(quote => {
                return quote;
            });
    }

    whichZeroInterestRate(shop): boolean {
        return Convert.toBool(this.props.zeroInterestRate ?? shop.zeroInterestRate);
    }

    whichInstalmentsAmount(widgetInstalments: number | null | undefined, shopMaxInstalments: number): number {
        if (!widgetInstalments) {
            return shopMaxInstalments;
        }

        if (widgetInstalments > shopMaxInstalments) {
            return shopMaxInstalments;
        }

        return widgetInstalments;
    }

    outputAprInfo() {
        return (
            <span>
                {
                    this.state.zeroInterestRate ? (
                        <span>
                            TAEG {this.state.loanQuote.max.apr}%
                        </span>
                    ) : (
                        <span>
                            TAEG max {this.state.loanQuote.max.apr}%, spesa complessiva max {this.state.loanQuote.max.totalRepaid}€
                        </span>
                    )
                }
            </span>
        );
    }
}

export default SoisyLoanQuoteWidget;
