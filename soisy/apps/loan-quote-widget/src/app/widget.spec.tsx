import React from 'react';
import SoisyLoanQuoteWidget from './widget';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const defaultShopId = 'partnershop';

describe('SoisyLoanQuoteWidget', () => {
    beforeEach(() => {
        mockFetchResponse({});
    })

    it('shows an error if no shopId is provided', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget />);

        expect(widget.text()).toEqual('shopId parameter is invalid.');
    });

    it('shows an error if no amount is set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" />);
        expect(window.fetch).toHaveBeenCalledWith(process.env.BASE_URL + '/shops/' + defaultShopId);
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(widget.text()).toEqual('amount parameter is not set.');
    });

    it('shows nothing if no state is set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);
        expect(window.fetch).toHaveBeenCalledWith(process.env.BASE_URL + '/shops/' + defaultShopId);
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(widget.html()).toEqual("<span></span>");
    });

    it('shows an error if shopId is not active', async () => {
        mockFetchResponse({active: false});
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);

        setImmediate(() => {
            widget.update();
            expect(widget.text()).toEqual('shopId is not active.');
        });
    });

    it('shows an error if selected instalments are greater than maxInstalments', async () => {
        mockFetchResponse({active: true, maxInstalmentsNumber: 12});
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={13}/>);

        setImmediate(() => {
            widget.update();
            expect(widget.text()).toEqual('instalments parameter is greater than shopId\'s maximum of 12');
        });
    });

    it('use widget\'s zero interest rate if set', async () => {
        mockFetchResponse({active: true, maxInstalmentsNumber: 12});
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={6} zeroInterestRate={true}/>);

        setImmediate(() => {
            widget.update();
            expect(widget.instance().state.zeroInterestRate).toBe(true);
        });
    });

    it('use shops\'s zero interest rate if widget\'s is not set', async () => {
        mockFetchResponse({active: true, maxInstalmentsNumber: 12, zeroInterestRate: true});
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" instalments={6}/>);

        setImmediate(() => {
            widget.update();
            expect(widget.instance().state.zeroInterestRate).toBe(true);
        });
    });
});

function mockFetchResponse(response) {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(response),
    }));
}
