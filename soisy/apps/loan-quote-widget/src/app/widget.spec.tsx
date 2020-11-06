import React from 'react';
import SoisyLoanQuoteWidget from './widget';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SoisyLoanQuoteWidget', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({}),
        }));
    })

    it('shows an error if no shopId is provided', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget />);
        expect(widget.text()).toEqual('shopId parameter is invalid.');
    });

    it('shows an error if no amount is set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" />);
        expect(widget.text()).toEqual('amount parameter is not set.');
    });

    it('shows an error if instalments parameter is not set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);
        expect(widget.text()).toEqual('instalments parameter is not set.');
    });

    it('shows nothing if state is not set yet', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={3}/>);
        expect(widget.html()).toEqual("<span></span>");
    });

    it('shows an error if shopId is not active', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={3} />);
        widget.setState({isShopActive: false}, () => {
            expect(widget.text()).toEqual('shopId is not active.');
        })
    });

    it('shows an error if widget\'s instalments are greater than shop\'s maxInstalments', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={13}/>);
        widget.setState({isShopActive: true, maxInstalmentsNumber: 12}, () => {
            expect(widget.text()).toEqual('instalments parameter is greater than shopId\'s maximum of 12');
        });
    });

    it('converts amount to eurocents', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget />);
        expect(widget.instance().amountToEurocents(12.34)).toBe(1234);
    });

    it('converts eurocents to amount', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget />);
        expect(widget.instance().eurocentsToAmount(1234)).toBe(12.34);
    });

    it('prefers widget\'s zeroInterestRate over shop\'s one', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget zeroInterestRate={true}/>);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: false})).toBe(true);
    });

    it('fallbacks on shop\'s zeroInterestRate if widget\'s one is not set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={6} />);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: false})).toBe(false);
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
