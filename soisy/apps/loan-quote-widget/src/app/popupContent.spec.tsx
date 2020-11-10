import React from "react";
import PopupContent from "./popupContent";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Popup content', () => {
    it('Renders text with standard interest rate', () => {
        const content = shallow(
            <PopupContent
                amount="66,10"
                instalments={12}
                zeroInterestRate={false}
                interestRate="5,50"
                apr="7,50"
            />
        );
        expect(content.text()).toMatch(/A partire da € 66,10 per 12 mesi,/);
        expect(content.text()).toMatch(/TAEG da 7,50% e TAN da 5,50% con il pagamento rateale/);
    });

    it('Renders text with zero interest rate', () => {
        const content = shallow(
            <PopupContent
                amount="66,10"
                instalments={12}
                zeroInterestRate={true}
                interestRate="5,50"
                apr="0,00"
            />
        );
        expect(content.text()).toMatch(/A partire da € 66,10 per 12 mesi senza interessi,/);
        expect(content.text()).toMatch(/TAEG da 0,00% e TAN da 5,50% con il pagamento rateale/);
    });
});
