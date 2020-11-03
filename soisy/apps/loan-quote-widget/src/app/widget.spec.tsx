import React from 'react';
import {render} from '@testing-library/react';
import SoisyLoanQuoteWidget from './widget';

describe('SoisyLoanQuoteWidget', () => {
    beforeEach(() => {
        mockFetchResponse({});
    })

    it('should show an error if no shopId is provided', async () => {
        const {getByText} = render(<SoisyLoanQuoteWidget />);

        expect(getByText('shopId parameter is invalid.')).toBeTruthy();
    });

    it('should show an error if no amount is set', async () => {
        const {getByText} = render(<SoisyLoanQuoteWidget shopId="partnershop" />);
        expect(window.fetch).toHaveBeenCalledWith('https://api.sandbox.soisy.it/api/shops/partnershop');
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(getByText('amount parameter is not set.')).toBeTruthy();
    });

    it('should show nothing if no state is set', async () => {
        const widget = render(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);
        expect(window.fetch).toHaveBeenCalledWith('https://api.sandbox.soisy.it/api/shops/partnershop');
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(widget.baseElement.innerHTML).toContain("<span></span>");
    });

    it('should show an error if shopId is not active', async () => {
        mockFetchResponse({active: false});

        const {getByText} = render(<SoisyLoanQuoteWidget shopId="partnershop" amount="1200" />);
        expect(window.fetch).toHaveBeenCalledWith('https://api.sandbox.soisy.it/api/shops/partnershop');
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(getByText('shopId is not active.')).toBeTruthy();
    });
});

function mockFetchResponse(response) {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(response),
    }));
};
