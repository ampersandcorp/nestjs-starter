import { EmailHandler } from '../EmailHandler';

describe('EmailHandler', () => {
  describe('validate', () => {
    it('should return true when email is valid', () => {
      expect(EmailHandler.validate('steve@example.com')).toBe(true);
    });

    it('should return false when email is invalid', () => {
      expect(EmailHandler.validate('steve@example')).toBe(false);
    });
  });
});
