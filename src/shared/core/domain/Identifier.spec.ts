import { Identifier } from './Identifier';

describe('Identifier', () => {
  it('should be defined', () => {
    const identifier = new Identifier('test');
    expect(identifier).toBeDefined();
  });

  describe('equals', () => {
    it('should return false when parameter is not given', () => {
      const identifier = new Identifier('test');
      expect(identifier.equals()).toEqual(false);
    });

    it('should return false when parameter is not instance of Identifier', () => {
      const identifier = new Identifier('test');
      expect(identifier.equals('test' as unknown as Identifier<string>)).toEqual(false);
    });

    it('should return true when parameter is instance of Identifier and value is same', () => {
      const identifier = new Identifier('test');
      const identifier2 = new Identifier('test');
      expect(identifier.equals(identifier2)).toEqual(true);
    });
  });

  describe('toString', () => {
    it('should return string value', () => {
      const identifier = new Identifier('test');
      const identifier2 = new Identifier(2);

      expect(identifier.toString()).toEqual('test');
      expect(identifier2.toString()).toEqual('2');
    });
  });

  describe('toNumber', () => {
    it('should return number value', () => {
      const identifier = new Identifier('test');
      const identifier2 = new Identifier(2);

      expect(identifier.toNumber()).toEqual(NaN);
      expect(identifier2.toNumber()).toEqual(2);
    });
  });

  describe('toValue', () => {
    it('should return value', () => {
      const identifier = new Identifier('test');
      const identifier2 = new Identifier(2);

      expect(identifier.toValue()).toEqual('test');
      expect(identifier2.toValue()).toEqual(2);
    });
  });

  describe('isNewIdentifier', () => {
    it('should return true when value is 0', () => {
      const identifier = new Identifier(0);
      expect(identifier.isNewIdentifier()).toEqual(true);
    });
  });
});
