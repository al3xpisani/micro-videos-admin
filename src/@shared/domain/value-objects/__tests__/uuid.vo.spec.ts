import { InvalidUuidError, Uuid } from '../uuid.vo';

describe('Uuid unit tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');
  it('should throw an error when uuid is invalid', () => {
    expect(() => {
      new Uuid('invalid-uuid');
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
  it('should create a valid uuid', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
  it('should accept a valid uuid', () => {
    const uuid = new Uuid('a63767b6-1b62-4f2c-95bd-be10355bf7ec');
    expect(uuid.id).toBe('a63767b6-1b62-4f2c-95bd-be10355bf7ec');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
