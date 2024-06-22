import { ValueObject } from '../value-object';

describe('Unit tests for value object', () => {
  class Address extends ValueObject {
    constructor(readonly street: string, readonly city: string) {
      super();
    }
  }
  it('should verify if objects are equal', () => {
    const valueStreet1 = new Address('1 av.', 'NY');
    const valueStreet2 = new Address('1 av.', 'NY');
    expect(valueStreet1.equals(valueStreet2)).toBe(true);
  });
});
