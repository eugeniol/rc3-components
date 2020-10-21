import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
import { NumericRangeWidget, fillOptions } from '../NumericRangeWidget';
Enzyme.configure({ adapter: new Adapter() });

describe('NumericRangeWidget', () => {
  it('should render select', () => {
    const wrapper = shallow(<NumericRangeWidget id="some-id" schema={{ minimum: 1, maximum: 10 }} />);
    expect(wrapper.find('SelectWidget')).toHaveLength(1);
    expect(wrapper.find('SelectWidget').props().options.enumOptions).toHaveLength(10);
  });
});

describe('fillOptions', () => {
  it('should sort a-z min, max', () => {
    expect(fillOptions(0, 0)).toEqual([{ value: 0, label: 0 }]);
    expect(fillOptions(1, 1)).toEqual([{ value: 1, label: 1 }]);
    expect(fillOptions(0, 1)).toEqual([
      { value: 0, label: 0 },
      { value: 1, label: 1 }
    ]);
    expect(fillOptions(1, 0)).toEqual([
      { value: 1, label: 1 },
      { value: 0, label: 0 }
    ]);
  });
  it('should sort z-a if max, min', () => {
    expect(fillOptions(1, 0)).toEqual([
      { value: 1, label: 1 },
      { value: 0, label: 0 }
    ]);
  });
});
