import React from 'react';
import QuoteSentence from "./sentence";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Quote Sentence', () => {
    it('shows sentence correctly with zeroInterestRate false', () => {
        const sentence = shallow(<QuoteSentence amount={12.34} instalments={6} zeroInterestRate={false} />);
        expect(sentence.html()).toBe('<span>€ 12.34 per 6 mesi con</span>');
    })

    it('shows that zeroInterestRate is active', () => {
        const sentence = shallow(<QuoteSentence amount={12.34} instalments={6} zeroInterestRate={true} />);
        expect(sentence.html()).toBe('<span>€ 12.34 per 6 mesi a tasso zero con</span>');
    })
});
