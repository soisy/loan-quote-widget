class Convert {
    static toBool(param: any): boolean {
        switch (param) {
            case true:
            case 1:
            case '1':
            case 'true':
            case 'on':
            case 'yes':
                return true;

            default:
                return false;
        }
    }

    static amountToEurocents(amount: number): number {
        return amount * 100;
    }

    static eurocentsToAmount(eurocents: number): number {
        return eurocents / 100;
    }

    static toReadableNumber(number: number, locale = 'it-IT') {
        return (new Intl.NumberFormat(locale, {style: 'decimal', minimumFractionDigits: 2})).format(number);
    }
}

export default Convert;
