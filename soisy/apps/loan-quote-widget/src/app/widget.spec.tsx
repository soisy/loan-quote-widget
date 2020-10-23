import React from 'react';
import {render} from '@testing-library/react';
import SoisyLoanQuoteWidget from './widget';

describe('SoisyLoanQuoteWidget', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({}),
        }));
    })
    // it('should render successfully', () => {
    //     const {baseElement} = render(<SoisyLoanQuoteWidget shopId="partnershop" />);
    //
    //     expect(baseElement.textContent).toContain('partnershop');
    // });
    // it('should render successfully', () => {
    //     const {baseElement} = render(<SoisyLoanQuoteWidget shopId="partnershop" amount="3000" />);
    //
    //     expect(baseElement.textContent).toContain('Puoi pagare in 10 rate da € 320,00 con Soisy');
    // });
    //
    // it('should render successfully with zero interest rate', () => {
    //     const {baseElement} = render(<SoisyLoanQuoteWidget shopId="partnershop" amount="3000" zero-interest-rate="1" />);
    //
    //     expect(baseElement.textContent).toContain('Puoi pagare in 10 rate da € 300,00 con Soisy');
    // });

    it('should show an error if no shopId is provided', () => {
        const {getByText} = render(<SoisyLoanQuoteWidget />);

        expect(getByText('shopId parameter is invalid.')).toBeTruthy();
    });

    it('should show an error if no amount is set', async () => {
        const {getByText} = render(<SoisyLoanQuoteWidget shopId="partnershop" />);
        expect(window.fetch).toHaveBeenCalledWith('https://api.sandbox.soisy.it/api/shops/partnershop');
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(getByText('amount parameter is not set.')).toBeTruthy();
    });

    it('should show an error if shopId is not active', async () => {
        const {getByText} = render(<SoisyLoanQuoteWidget shopId="partnershop" />);
        expect(window.fetch).toHaveBeenCalledWith('https://api.sandbox.soisy.it/api/shops/partnershop');
        expect(window.fetch).toHaveBeenCalledTimes(1);

        expect(getByText('shopId is not active.')).toBeTruthy();
    });
});
