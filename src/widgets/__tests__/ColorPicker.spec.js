import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
import { ColorPickerWidget } from '../ColorPickerWidget';
import { SketchPicker } from 'react-color';
Enzyme.configure({ adapter: new Adapter() });

describe('ColorPickerWidget', () => {
  it('should render a collapsed color picker', () => {
    const underTest = shallow(<ColorPickerWidget />);
    expect(underTest.find('.form-control')).toHaveLength(1);
    expect(underTest.find(SketchPicker)).toHaveLength(0);
  });

  it('should display color picker on click', () => {
    const underTest = shallow(<ColorPickerWidget />);
    underTest.find('.form-control').simulate('click');
    expect(underTest.find(SketchPicker)).toHaveLength(1);
  });

  it('should initial not display color picker', () => {
    const underTest = shallow(<ColorPickerWidget />);
    expect(underTest.state('displayColorPicker')).toBe(false);
  });

  it('should switch picker display on click', () => {
    const underTest = shallow(<ColorPickerWidget />);
    expect(underTest.state('displayColorPicker')).toBe(false);
    underTest.instance().handleClick();
    expect(underTest.state('displayColorPicker')).toBe(true);
    underTest.instance().handleClick();
    expect(underTest.state('displayColorPicker')).toBe(false);
  });

  it('should hide on close', () => {
    const underTest = shallow(<ColorPickerWidget />);
    underTest.setState({ displayColorPicker: true });
    underTest.instance().handleClose();
    expect(underTest.state('displayColorPicker')).toBe(false);
  });

  it('should call on change', async () => {
    const spy = jest.fn();
    const underTest = shallow(<ColorPickerWidget onChange={spy} />);
    underTest.setState({ displayColorPicker: true });
    underTest.instance().handleChange({ rgb: { r: 100, g: 50, b: 0, a: 1 } });
    await new Promise(setImmediate);
    expect(spy).toHaveBeenCalledWith('rgba(100,50,0,1)');
  });
});
