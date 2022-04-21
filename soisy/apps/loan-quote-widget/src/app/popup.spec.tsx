import React from 'react';
import { configure, shallow } from 'enzyme';
import Popup from "./popup";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

describe('Popup', () => {
    it('Renders clickable info sign if popup is not open', () => {
        const amount = {
            amount: 100
        }
        const popup = shallow(<Popup min={amount} max={amount} />);
        assertInfoIconIsVisible(popup);
    });

    it('Renders popup after info icon is clicked', () => {
        const amount = {
           amount: 100
        }
        const popup = shallow(<Popup min={amount} max={amount} />);
        // console.log(popup.find('popup__PopupTrigger').simulate('click'));
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
