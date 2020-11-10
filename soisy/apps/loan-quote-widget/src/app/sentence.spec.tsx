import React from 'react';
import QuoteSentence from "./sentence";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Quote Sentence', () => {
    it('shows sentence correctly with zeroInterestRate false', () => {
        const sentence = shallow(<QuoteSentence amount="12,34" instalments={6} zeroInterestRate={false} />);
        expect(sentence.text()).toBe('€ 12,34 per 6 mesi con');
    });

    it('shows that zeroInterestRate is active', () => {
        const sentence = shallow(<QuoteSentence amount="12,34" instalments={6} zeroInterestRate={true} />);
        expect(sentence.text()).toBe('€ 12,34 per 6 mesi a tasso zero con');
    });

    it('shows currency numbers formatted in it-IT', () => {
        const doubleZero = shallow(<QuoteSentence amount="66,00" instalments={6} zeroInterestRate={false} />);
        expect(doubleZero.text()).toBe('€ 66,00 per 6 mesi con');

        const trailingZero = shallow(<QuoteSentence amount="66,10"instalments={6} zeroInterestRate={false} />);
        expect(trailingZero.text()).toBe('€ 66,10 per 6 mesi con');

        const itCurrency = shallow(<QuoteSentence amount="1.234,56" instalments={6} zeroInterestRate={false} />);
        expect(itCurrency.text()).toBe('€ 1.234,56 per 6 mesi con');
    });
});
