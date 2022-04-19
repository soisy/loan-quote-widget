import React from 'react';
import SoisyLoanQuote from './soisyloanquote';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Soisy Loan Quote', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({}),
        }));
    })

    it('shows an error if no shopId is provided', async () => {
        const widget = shallow(<SoisyLoanQuote />);
        expect(widget.text()).toEqual('shopId parameter is invalid.');
    });

    it('shows an error if no amount is set', async () => {
        const widget = shallow(<SoisyLoanQuote shopId="partnershop" />);
        expect(widget.text()).toEqual('amount parameter is not set.');
    });

    it('shows nothing if state is not set yet', async () => {
        const widget = shallow(<SoisyLoanQuote shopId="partnershop" amount="1200" instalments={3}/>);
        expect(widget.html()).toEqual("<span></span>");
    });

    it('shows an error if shopId is not active', async () => {
        const widget = shallow(<SoisyLoanQuote shopId="partnershop" amount="1200" instalments={3} />);
        widget.setState({isShopActive: false}, () => {
            expect(widget.text()).toEqual('shopId is not active.');
        })
    });

    it('backs up to shop\'s max instalments if widget\'s instalments are greater than shop\'s maximum', async () => {
        let widget = shallow(<SoisyLoanQuote shopId="partnershop" amount="1200" instalments={13}/>);
        expect(widget.instance().whichInstalmentsAmount(13, 12)).toEqual(12);

        widget = shallow(<SoisyLoanQuote shopId="partnershop" amount="1200" instalments={0}/>);
        expect(widget.instance().whichInstalmentsAmount(0, 12)).toEqual(12);

        widget = shallow(<SoisyLoanQuote shopId="partnershop" amount="1200" />);
        expect(widget.instance().whichInstalmentsAmount(null, 12)).toEqual(12);

        widget = shallow(<SoisyLoanQuote shopId="partnershop" amount="1200" />);
        expect(widget.instance().whichInstalmentsAmount(undefined, 12)).toEqual(12);
    });

    it('prefers widget\'s zeroInterestRate over shop\'s one', async () => {
        let widget = shallow(<SoisyLoanQuote zeroInterestRate={true}/>);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: false})).toBe(true);

        widget = shallow(<SoisyLoanQuote zeroInterestRate="1"/>);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: false})).toBe(true);

        widget = shallow(<SoisyLoanQuote zeroInterestRate="0"/>);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: true})).toBe(false);
    });

    it('fallbacks on shop\'s zeroInterestRate if widget\'s one is not set', async () => {
        const widget = shallow(<SoisyLoanQuote />);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: false})).toBe(false);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: true})).toBe(true);
    });

    it('outputs complete loan quote with standard interest rate', async () => {
        const quoteParams = {
            amount: 1200,
            instalments: 12,
            zeroInterestRate: false,
            shopId: 'partnershop'
        }
        const widget = mount(
            <SoisyLoanQuote
                shopId={quoteParams.shopId}
                amount={quoteParams.amount}
                instalments={quoteParams.instalments}
                zeroInterestRate={quoteParams.zeroInterestRate} />
        );

        await mockComponentDidMount(
            widget,
            quoteParams.shopId,
            {
                active: true,
                maxInstalmentsNumber: quoteParams.instalments * 2,
                zeroInterestRate: true
            },
            {
                amount: quoteParams.amount * 100,
                instalments: quoteParams.instalments,
                zeroInterestRate: quoteParams.zeroInterestRate
            },
            {
                min: {
                    instalmentAmount: 6600,
                    interestRate: 5.5,
                    apr: 7.5,
                    totalRepaid: 135000,
                },
                max: {
                    instalmentAmount: 8000,
                    interestRate: 11.5,
                    apr: 14.5,
                    totalRepaid: 140000,
                },
            }
        );

        widget.update();
        expect(widget.text()).toMatch(/da 66,00 € per 12 mesi con TAEG max 14,50%, spesa complessiva max 1.400,00€/);
    });

    it('outputs complete loan quote with zero interest rate', async () => {
        const quoteParams = {
            amount: 1200,
            instalments: 12,
            zeroInterestRate: true,
            shopId: 'partnershop'
        }
        const widget = mount(
            <SoisyLoanQuote
                shopId={quoteParams.shopId}
                amount={quoteParams.amount}
                instalments={quoteParams.instalments}
                zeroInterestRate={quoteParams.zeroInterestRate} />
        );

        await mockComponentDidMount(
            widget,
            quoteParams.shopId,
            {
                active: true,
                maxInstalmentsNumber: quoteParams.instalments * 2,
                zeroInterestRate: true
            },
            {
                amount: quoteParams.amount * 100,
                instalments: quoteParams.instalments,
                zeroInterestRate: quoteParams.zeroInterestRate
            },
            {
                min: {
                    instalmentAmount: 6600,
                    interestRate: 5.5,
                    apr: 0,
                    totalRepaid: 120000,

                },
                max: {
                    instalmentAmount: 6600,
                    interestRate: 14,
                    apr: 0,
                    totalRepaid: 120000,
                },
            }
        );

        widget.update();
        expect(widget.text()).toMatch(/da 66,00 € per 12 mesi a tasso zero con TAEG 0,00%/);
    });

    it('outputs complete loan quote if widget instalments are higher than shop\'s', async () => {
        const quoteParams = {
            amount: 1200,
            instalments: 12,
            shopMaxInstalments: 3,
            zeroInterestRate: false,
            shopId: 'partnershop'
        }
        const widget = mount(
            <SoisyLoanQuote
                shopId={quoteParams.shopId}
                amount={quoteParams.amount}
                instalments={quoteParams.instalments}
                zeroInterestRate={quoteParams.zeroInterestRate} />
        );

        await mockComponentDidMount(
            widget,
            quoteParams.shopId,
            {
                active: true,
                maxLoanInstalmentsNumber: quoteParams.shopMaxInstalments,
                zeroInterestRate: true
            },
            {
                amount: quoteParams.amount * 100,
                instalments: quoteParams.shopMaxInstalments,
                zeroInterestRate: quoteParams.zeroInterestRate
            },
            {
                min: {
                    instalmentAmount: 6600,
                    interestRate: 5.5,
                    apr: 7.5,
                    totalRepaid: 135000,
                },
                max: {
                    instalmentAmount: 8000,
                    interestRate: 11.5,
                    apr: 14.5,
                    totalRepaid: 140000,
                },
            }
        );

        widget.update();
        expect(widget.text()).toMatch(/da 66,00 € per 3 mesi con/);
        expect(widget.text()).toMatch(/da 66,00 € per 3 mesi con TAEG max 14,50%, spesa complessiva max 1.400,00€/);
    });
});

function mockGetShopResponse(widget, response: object) {
    const getShop = jest.fn();
    getShop.mockReturnValue(response);
    widget.instance().getShop = getShop;
    return getShop;
}

function mockLoanQuoteResponse(widget, response: object) {
    const getLoanQuote = jest.fn();
    getLoanQuote.mockReturnValue(response);
    widget.instance().getLoanQuote = getLoanQuote;
    return getLoanQuote;
}

async function mockComponentDidMount(widget, shopId, getShopResponse, getLoanQuoteParams, getLoanQuoteResponse) {
    const shopMock = mockGetShopResponse(widget, getShopResponse);
    const loanQuoteMock = mockLoanQuoteResponse(widget, getLoanQuoteResponse);
    await widget.instance().componentDidMount();
    expect(shopMock).toBeCalledWith(shopId);
    expect(shopMock).toReturnWith(getShopResponse);
    expect(loanQuoteMock).toBeCalledWith(getLoanQuoteParams.amount, getLoanQuoteParams.instalments, getLoanQuoteParams.zeroInterestRate);
    expect(loanQuoteMock).toReturnWith(getLoanQuoteResponse);
}
