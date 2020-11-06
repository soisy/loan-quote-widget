import React from 'react';
import SoisyLoanQuoteWidget from './widget';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ShallowRenderer} from "react-dom/test-utils";
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

    it('shows nothing if no state is set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);
        expect(widget.html()).toEqual("<span></span>");
    });

    it('shows an error if shopId is not active', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);
        widget.setState({isShopActive: false}, () => {
            expect(widget.text()).toEqual('shopId is not active.');
        })
    });

    it('shows an error if selected instalments are greater than maxInstalments', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={13}/>);
        widget.setState({isShopActive: true, maxInstalmentsNumber: 12}, () => {
            expect(widget.text()).toEqual('instalments parameter is greater than shopId\'s maximum of 12');
        });
    });

    it('prefers widget\'s zeroInterestRate over shop\'s one', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={6} zeroInterestRate={true}/>);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: false})).toBe(true);
    });

    it('fallbacks on shop\'s zeroInterestRate if widget\'s one is not set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={6} />);
        expect(widget.instance().whichZeroInterestRate({zeroInterestRate: false})).toBe(false);
    });

    // it('use shops\'s zero interest rate if widget\'s is not set', async () => {
    //     window.fetch = jest.fn()
    //         .mockImplementationOnce(() => Promise.resolve({
    //             json: () => Promise.resolve({active: true, maxInstalmentsNumber: 12, zeroInterestRate: true}),
    //         }))
    //         .mockImplementationOnce(() => Promise.resolve({
    //             json: () => Promise.resolve({"min":{"fee":2496,"interest":1973,"interestRate":5.5,"totalRepaid":124469,"apr":13.42,"instalmentAmount":20745},"median":{"fee":2196,"interest":2328,"interestRate":6.5,"totalRepaid":124524,"apr":13.59,"instalmentAmount":20754},"max":{"fee":12,"interest":4947,"interestRate":14,"totalRepaid":124959,"apr":14.97,"instalmentAmount":20827}}),
    //         }));
    //
    //     const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={6} zeroInterestRate={false}/>);
    //
    //     setImmediate(() => {
    //         widget.update();
    //         expect(widget.text()).toContain('per 6 mesi con Soisy');
    //     });
    // });
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
