import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Popup from "./popup";
configure({ adapter: new Adapter() });

describe('Popup', () => {
    it('Renders clickable info sign if popup is not open', () => {
        const popup = shallow(<Popup instalments="12" zeroInterestRate="true" min="5" max="20" />);
        assertInfoIconIsVisible(popup);
    });

    it('Renders popup after info icon is clicked', () => {
        const popup = shallow(<Popup instalments="12" zeroInterestRate="true" min="5" max="20" />);

        popup.setState({isPopupOpen: true}, () => {
            assertInfoIconIsVisible(popup);
            assertAllPopupComponentsAreVisible(popup);
        });
    });
});

function assertInfoIconIsVisible(popup) {
    expect(popup.contains([<img src="info.svg" alt="info" />])).toBeTruthy();
}

function assertAllPopupComponentsAreVisible(popup) {
    expect(popup.find('popup__PopupBg').length).toBe(1);
    expect(popup.find('popup__PopupWrapper').length).toBe(1);
    expect(popup.find('PopupContent').length).toBe(1);
}
