import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from 'react-select';
import { shallow } from 'enzyme';
import { SelectWidget, getValue, processValue } from '../SelectWidget';
Enzyme.configure({ adapter: new Adapter() });
const enumOptions = ['no', 'yes'].map(value => ({ value }));
describe('getValue', () => {
  it('should get scalar value', () => {
    expect(getValue({ value: 'foo' })).toBe('foo');
  });
  it('should get multiple value', () => {
    expect(getValue([{ value: 'foo' }, { value: 'bar' }], true)).toEqual(['foo', 'bar']);
  });
});
describe('processValue', () => {
  it('should return undefined if value ""', () => {
    expect(processValue({}, '')).toBeUndefined();
  });
  it('should return array of numbers', () => {
    expect(processValue({ type: 'array', items: { type: 'integer' } }, ['2', '3'])).toEqual([2, 3]);
  });
  it('should return true if boolean', () => {
    expect(processValue({ type: 'boolean' }, 'true')).toBe(true);
  });
  it('should return number if type number', () => {
    expect(processValue({ type: 'number' }, '2')).toBe(2);
  });
  it('should return number if enum of number', () => {
    expect(processValue({ enum: [2, 3, 4] }, '2')).toBe(2);
  });
  it('should return boolean if enum of bool', () => {
    expect(processValue({ enum: [true, false] }, 'true')).toBe(true);
  });
});
describe('SelectWidget', () => {
  it('should handle on blur', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <SelectWidget id="some id" schema={{ schema: {} }} value="yes" onBlur={spy} options={{ enumOptions }} />
    );
    wrapper.instance().handleOnBlur();
    expect(spy).toHaveBeenCalledWith('some id', 'yes');
  });
  it('should handle on focus', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <SelectWidget id="some id" schema={{ schema: {} }} value="yes" onFocus={spy} options={{ enumOptions }} />
    );
    wrapper.instance().handleOnFocus();
    expect(spy).toHaveBeenCalledWith('some id', 'yes');
  });
  it('should handle on change call with value', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <SelectWidget schema={{ schema: {} }} id="some id" onChange={spy} options={{ enumOptions }} />
    );
    wrapper.instance().handleOnChange({ value: 'yes' });
    expect(spy).toHaveBeenCalledWith('yes');
  });
  it('should return enumOptions as mappedOptions', () => {
    const wrapper = shallow(<SelectWidget id="some id" schema={{ schema: {} }} options={{ enumOptions }} />);
    expect(wrapper.instance().mappedOptions).toEqual(enumOptions);
  });
  it('should return scalar as default value', () => {
    const wrapper = shallow(
      <SelectWidget id="some id" schema={{ schema: {} }} value="yes" options={{ enumOptions }} />
    );
    expect(wrapper.instance().defaultValue).toEqual({ value: 'yes' });
  });
  it('should return array as default value', () => {
    const wrapper = shallow(
      <SelectWidget id="some id" schema={{ schema: {} }} value={['yes']} multiple options={{ enumOptions }} />
    );
    expect(wrapper.instance().defaultValue).toEqual([{ value: 'yes' }]);
  });

  it('should map enumOptions if disabled options ', () => {
    const enumDisabled = ['no'];
    const wrapper = shallow(
      <SelectWidget id="some id" schema={{ schema: {} }} options={{ enumOptions, enumDisabled }} />
    );
    expect(wrapper.instance().mappedOptions).toEqual([
      { value: 'no', isDisabled: true },
      { value: 'yes', isDisabled: false }
    ]);
  });
  it('should render react select', () => {
    const wrapper = shallow(<SelectWidget id="some id" schema={{ schema: {} }} options={{ enumOptions }} />);
    expect(wrapper.find(Select)).toHaveLength(1);
    const p = wrapper.find(Select).props();
    expect(p).toHaveProperty('onBlur', wrapper.instance().handleOnBlur);
    expect(p).toHaveProperty('onFocus', wrapper.instance().handleOnFocus);
    expect(p).toHaveProperty('onChange', wrapper.instance().handleOnChange);
  });
});
