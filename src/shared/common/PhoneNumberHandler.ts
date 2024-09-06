import parsePhoneNumber from 'libphonenumber-js';

export class PhoneNumberHandler {
  static getValidPhoneNumber(phoneNumber: string): string {
    const parsedPhoneNumberInstance = parsePhoneNumber(phoneNumber, 'KR');
    if (!parsedPhoneNumberInstance) {
      return phoneNumber;
    }

    if (!parsedPhoneNumberInstance.isValid() || !parsedPhoneNumberInstance.isPossible()) {
      return phoneNumber;
    }

    return parsedPhoneNumberInstance.number;
  }

  static getLocalPhoneNumber(phoneNumber: string, enableHyphen: boolean = true): string {
    const parsedPhoneNumberInstance = parsePhoneNumber(phoneNumber, 'KR');
    if (!parsedPhoneNumberInstance) {
      return phoneNumber;
    }

    return enableHyphen ? parsedPhoneNumberInstance.formatNational() : parsedPhoneNumberInstance.formatNational().replaceAll('-', '');
  }
}
