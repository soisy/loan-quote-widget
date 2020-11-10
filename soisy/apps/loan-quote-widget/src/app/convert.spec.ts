import Convert from "./convert";

describe('Convert', () => {
    it('converts numbers and string to correct boolean value', () => {
        expect(Convert.toBool(0)).toBe(false);
        expect(Convert.toBool("0")).toBe(false);

        expect(Convert.toBool(1)).toBe(true);
        expect(Convert.toBool("1")).toBe(true);
        expect(Convert.toBool("true")).toBe(true);
        expect(Convert.toBool("on")).toBe(true);
        expect(Convert.toBool("yes")).toBe(true);
    });

    it('converts amount to eurocents', () => {
        expect(Convert.amountToEurocents(12.34)).toBe(1234);
    });

    it('converts eurocents to amount', () => {
        expect(Convert.eurocentsToAmount(1234)).toBe(12.34);
    });

    it('it converts number to IT currency', () => {
        expect(Convert.toCurrency(1234.56)).toBe('1.234,56');
        expect(Convert.toCurrency(1234)).toBe('1.234,00');
    });
});
