import React from 'react';
import {render} from '@testing-library/react';

import SoisyLoanQuoteWidget from './widget';

describe('SoisyLoanQuoteWidget', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<SoisyLoanQuoteWidget shopId="partnershop" />);

        expect(baseElement.textContent).toContain('partnershop');
    });

    it('should an error if no shopId is provided', () => {
        const {getByText} = render(<SoisyLoanQuoteWidget/>);

        expect(getByText('shopId parameter is invalid.')).toBeTruthy();
    });
});
