import React from 'react';
import SoisyLoanQuoteWidget from './widget';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('SoisyLoanQuoteWidget', () => {
    beforeEach(() => {
        mockFetchResponse({});
    })

    it('should show an error if no shopId is provided', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget />);

        expect(widget.contains('shopId parameter is invalid.')).toBeTruthy();
    });

    it('should show an error if no amount is set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" />);
        expect(window.fetch).toHaveBeenCalledWith('https://api.sandbox.soisy.it/api/shops/partnershop');
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(widget.contains('amount parameter is not set.')).toBeTruthy();
    });

    it('should show nothing if no state is set', async () => {
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);
        expect(window.fetch).toHaveBeenCalledWith('https://api.sandbox.soisy.it/api/shops/partnershop');
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(widget.contains(<span />)).toBeTruthy();
    });

    it('should show an error if shopId is not active', async () => {
        mockFetchResponse({active: false});
        const widget = shallow(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);
        expect(window.fetch).toHaveBeenCalledWith('https://api.sandbox.soisy.it/api/shops/partnershop');
        expect(window.fetch).toHaveBeenCalledTimes(1);

        asyncAssert(widget.contains('shopId is not active.'));
    });
});

function mockFetchResponse(response) {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(response),
    }));
};

function asyncAssert(condition) {
    setTimeout(() => {
        expect(condition).toBeTruthy();
    }, 200);
}
