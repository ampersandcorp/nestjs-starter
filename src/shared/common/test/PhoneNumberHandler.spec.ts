import { PhoneNumberHandler } from '../PhoneNumberHandler';

describe('PhoneNumberHandler', () => {
  describe('getValidPhoneNumber', () => {
    it('should return given parameter if phoneNumber is invalid', () => {
      const undefinedPhoneNumberString = '';

      const phoneNumber = PhoneNumberHandler.getValidPhoneNumber(undefinedPhoneNumberString);

      expect(phoneNumber).toBe('');
    });

    it('should return given parameter if phoneNumber is unavailable', () => {
      const impossiblePhoneNumberString = '000000000';

      const phoneNumber = PhoneNumberHandler.getValidPhoneNumber(impossiblePhoneNumberString);

      expect(phoneNumber).toBe('000000000')
    });

    describe('should return valid phoneNumber', () => {
      it('if given phoneNumber is common mobile phone number', () => {
        const phoneNumberString = '01012345678';
        const phoneNumberStringWithHyphen = '010-1234-5678';
        const phoneNumberStringWithSpace = '010 1234 5678';
        const phoneNumberStringWithParenthesis = '(010)1234-5678';
        const phoneNumberStringWithCountryCode = '+821012345678';
        const phoneNumberStringWithCountryCodeAndHyphen = '+82-10-1234-5678';
        const phoneNumberStringWithCountryCodeAndParenthesis = '+82(10)1234-5678';
        const phoneNumberStringWithCountryCodeAndHyphenAndParenthesis = '+82-(10)1234-5678';

        const phoneNumber = PhoneNumberHandler.getValidPhoneNumber(phoneNumberString);
        const phoneNumberWithHyphen = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithHyphen);
        const phoneNumberWithSpace = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithSpace);
        const phoneNumberWithParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithParenthesis);
        const phoneNumberWithCountryCode = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCode);
        const phoneNumberWithCountryCodeAndHyphen = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndHyphen);
        const phoneNumberWithCountryCodeAndParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndParenthesis);
        const phoneNumberWithCountryCodeAndHyphenAndParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndHyphenAndParenthesis);

        expect(phoneNumber).toBe('+821012345678');
        expect(phoneNumberWithHyphen).toBe('+821012345678');
        expect(phoneNumberWithSpace).toBe('+821012345678');
        expect(phoneNumberWithParenthesis).toBe('+821012345678');
        expect(phoneNumberWithCountryCode).toBe('+821012345678');
        expect(phoneNumberWithCountryCodeAndHyphen).toBe('+821012345678');
        expect(phoneNumberWithCountryCodeAndParenthesis).toBe('+821012345678');
        expect(phoneNumberWithCountryCodeAndHyphenAndParenthesis).toBe('+821012345678');
      });

      it('if given phoneNumber is common landline phone number', () => {
        const phoneNumberString = '0311234567';
        const phoneNumberStringWithHyphen = '031-123-4567';
        const phoneNumberStringWithSpace = '031 123 4567';
        const phoneNumberStringWithParenthesis = '(031)123-4567';
        const phoneNumberStringWithCountryCode = '+82311234567';
        const phoneNumberStringWithCountryCodeAndHyphen = '+82-31-123-4567';
        const phoneNumberStringWithCountryCodeAndParenthesis = '+82(31)123-4567';
        const phoneNumberStringWithCountryCodeAndHyphenAndParenthesis = '+82-(31)123-4567';

        const phoneNumber = PhoneNumberHandler.getValidPhoneNumber(phoneNumberString);
        const phoneNumberWithHyphen = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithHyphen);
        const phoneNumberWithSpace = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithSpace);
        const phoneNumberWithParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithParenthesis);
        const phoneNumberWithCountryCode = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCode);
        const phoneNumberWithCountryCodeAndHyphen = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndHyphen);
        const phoneNumberWithCountryCodeAndParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndParenthesis);
        const phoneNumberWithCountryCodeAndHyphenAndParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndHyphenAndParenthesis);

        expect(phoneNumber).toBe('+82311234567');
        expect(phoneNumberWithHyphen).toBe('+82311234567');
        expect(phoneNumberWithSpace).toBe('+82311234567');
        expect(phoneNumberWithParenthesis).toBe('+82311234567');
        expect(phoneNumberWithCountryCode).toBe('+82311234567');
        expect(phoneNumberWithCountryCodeAndHyphen).toBe('+82311234567');
        expect(phoneNumberWithCountryCodeAndParenthesis).toBe('+82311234567');
        expect(phoneNumberWithCountryCodeAndHyphenAndParenthesis).toBe('+82311234567');
      });

      it('if given phoneNumber is 070 number', () => {
        const phoneNumberString = '07012345678';
        const phoneNumberStringWithHyphen = '070-1234-5678';
        const phoneNumberStringWithSpace = '070 1234 5678';
        const phoneNumberStringWithParenthesis = '(070)1234-5678';
        const phoneNumberStringWithCountryCode = '+827012345678';
        const phoneNumberStringWithCountryCodeAndHyphen = '+82-70-1234-5678';
        const phoneNumberStringWithCountryCodeAndParenthesis = '+82(70)1234-5678';
        const phoneNumberStringWithCountryCodeAndHyphenAndParenthesis = '+82-(70)1234-5678';

        const phoneNumber = PhoneNumberHandler.getValidPhoneNumber(phoneNumberString);
        const phoneNumberWithHyphen = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithHyphen);
        const phoneNumberWithSpace = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithSpace);
        const phoneNumberWithParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithParenthesis);
        const phoneNumberWithCountryCode = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCode);
        const phoneNumberWithCountryCodeAndHyphen = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndHyphen);
        const phoneNumberWithCountryCodeAndParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndParenthesis);
        const phoneNumberWithCountryCodeAndHyphenAndParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndHyphenAndParenthesis);

        expect(phoneNumber).toBe('+827012345678');
        expect(phoneNumberWithHyphen).toBe('+827012345678');
        expect(phoneNumberWithSpace).toBe('+827012345678');
        expect(phoneNumberWithParenthesis).toBe('+827012345678');
        expect(phoneNumberWithCountryCode).toBe('+827012345678');
        expect(phoneNumberWithCountryCodeAndHyphen).toBe('+827012345678');
        expect(phoneNumberWithCountryCodeAndParenthesis).toBe('+827012345678');
        expect(phoneNumberWithCountryCodeAndHyphenAndParenthesis).toBe('+827012345678');
      });

      it('if given phoneNumber is XXXX-XXXX number', () => {
        const phoneNumberString = '1234-5678';
        const phoneNumberStringWithHyphen = '1234-5678';
        const phoneNumberStringWithSpace = '1234 5678';
        const phoneNumberStringWithParenthesis = '(1234)5678';
        const phoneNumberStringWithCountryCode = '+8212345678';
        const phoneNumberStringWithCountryCodeAndHyphen = '+82-1234-5678';
        const phoneNumberStringWithCountryCodeAndParenthesis = '+82(1234)5678';
        const phoneNumberStringWithCountryCodeAndHyphenAndParenthesis = '+82-(1234)5678';

        const phoneNumber = PhoneNumberHandler.getValidPhoneNumber(phoneNumberString);
        const phoneNumberWithHyphen = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithHyphen);
        const phoneNumberWithSpace = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithSpace);
        const phoneNumberWithParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithParenthesis);
        const phoneNumberWithCountryCode = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCode);
        const phoneNumberWithCountryCodeAndHyphen = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndHyphen);
        const phoneNumberWithCountryCodeAndParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndParenthesis);
        const phoneNumberWithCountryCodeAndHyphenAndParenthesis = PhoneNumberHandler.getValidPhoneNumber(phoneNumberStringWithCountryCodeAndHyphenAndParenthesis);

        expect(phoneNumber).toBe('+8212345678');
        expect(phoneNumberWithHyphen).toBe('+8212345678');
        expect(phoneNumberWithSpace).toBe('+8212345678');
        expect(phoneNumberWithParenthesis).toBe('+8212345678');
        expect(phoneNumberWithCountryCode).toBe('+8212345678');
        expect(phoneNumberWithCountryCodeAndHyphen).toBe('+8212345678');
        expect(phoneNumberWithCountryCodeAndParenthesis).toBe('+8212345678');
        expect(phoneNumberWithCountryCodeAndHyphenAndParenthesis).toBe('+8212345678');
      });
    });
  });

  describe('getLocalPhoneNumber', () => {
    it('should return local phone number', () => {
      expect(PhoneNumberHandler.getLocalPhoneNumber('+821012345678')).toBe('010-1234-5678');
      expect(PhoneNumberHandler.getLocalPhoneNumber('+82311234567')).toBe('031-123-4567');
      expect(PhoneNumberHandler.getLocalPhoneNumber('+827012345678')).toBe('070-1234-5678');
      expect(PhoneNumberHandler.getLocalPhoneNumber('+8212345678')).toBe('1234-5678');
      expect(PhoneNumberHandler.getLocalPhoneNumber('+8221234567')).toBe('02-123-4567');
    });

    it('should return local phone number with hyphen', () => {
      expect(PhoneNumberHandler.getLocalPhoneNumber('+821012345678', false)).toBe('01012345678');
      expect(PhoneNumberHandler.getLocalPhoneNumber('+82311234567', false)).toBe('0311234567');
      expect(PhoneNumberHandler.getLocalPhoneNumber('+827012345678', false)).toBe('07012345678');
      expect(PhoneNumberHandler.getLocalPhoneNumber('+8212345678', false)).toBe('12345678');
      expect(PhoneNumberHandler.getLocalPhoneNumber('+8221234567', false)).toBe('021234567');
    });
  });
});
