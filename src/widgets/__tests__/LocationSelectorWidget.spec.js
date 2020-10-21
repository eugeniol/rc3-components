import { toValue, fromValue } from '../LocationSelectorWidget';

describe('fromValue', () => {
  it('should return empty string', () => {
    ['egg', 'location="yum-location"', ''].forEach(str => expect(fromValue(str)).toEqual(''));
  });
  it('should return location attribute value', () => {
    expect(fromValue('[location="yum-location"]')).toEqual('yum-location');
  });
});

describe('toValue', () => {
  it('should convert to css attribute', () => {
    ['pdp', 'yum-location'].forEach(str => {
      expect(toValue(str)).toEqual(`[location="${str}"]`);
    });
  });
  it('should return empty string if no value', () => {
    expect(toValue()).toEqual('');
    expect(toValue('')).toEqual('');
    expect(toValue(false)).toEqual('');
  });
});
