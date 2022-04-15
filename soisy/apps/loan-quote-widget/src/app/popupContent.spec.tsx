import React from "react";
import PopupContent from "./popupContent";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Popup content', () => {
    it('Renders text with standard interest rate', () => {
        const min = {
            amount: "66,10",
            totalRepaid: "1.350,00",
            interestRate: "7,50",
            apr: "5,50",
        };

        const max = {
            amount: "70,10",
            totalRepaid: "1.400,00",
            interestRate: "11,50",
            apr: "14,50",
        };

        const content = shallow(
            <PopupContent
                instalments={12}
                zeroInterestRate={false}
                min={min}
                max={max}
            />
        );
        expect(content.text()).toMatch(/Da 66,10 € per 12 mesi,/);
        expect(content.text()).toMatch(/TAN da 7,50% a 11,50% - TAEG da 5,50% a 14,50%/);
        expect(content.text()).toMatch(/Spesa complessiva da 1.350,00€ a 1.400,00€/);
    });

    it('Renders text with zero interest rate', () => {
        const min = {
            amount: "66,10",
            totalRepaid: "1.399,99",
            interestRate: "7,50",
            apr: "5,50",
        };

        const max = {
            amount: "66,10",
            totalRepaid: "1.400,00",
            interestRate: "11,50",
            apr: "0,00",
        };

        const content = shallow(
            <PopupContent
                instalments={12}
                zeroInterestRate={true}
                min={min}
                max={max}
            />
        );
        expect(content.text()).toMatch(/Da 66,10 € per 12 mesi a tasso zero,/);
        expect(content.text()).toMatch(/TAEG 0,00%/);
        expect(content.text()).toMatch(/Spesa complessiva 1.400,00€/);
    });
});
