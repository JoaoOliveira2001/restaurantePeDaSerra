import { cleanPhoneNumber } from './phone';

describe('cleanPhoneNumber', () => {
  it('removes format characters and plus sign', () => {
    expect(cleanPhoneNumber('(11) 99999-9999')).toBe('11999999999');
    expect(cleanPhoneNumber('+5511999999999')).toBe('5511999999999');
    expect(cleanPhoneNumber('5511999999999')).toBe('5511999999999');
  });
});
