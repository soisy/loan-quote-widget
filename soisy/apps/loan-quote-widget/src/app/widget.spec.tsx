import React from 'react';
import { render } from '@testing-library/react';

import SoisyLoanQuoteWidget from './widget';

describe('SoisyLoanQuoteWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SoisyLoanQuoteWidget />);

    expect(baseElement).toBeTruthy();
  });
});
