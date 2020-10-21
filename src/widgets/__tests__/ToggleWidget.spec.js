import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
import { ToggleWidget, ToggleIconOff, ToggleIconOn } from '../ToggleWidget';
Enzyme.configure({ adapter: new Adapter() });
const enumOptions = ['no', 'yes'].map(value => ({ value }));
describe('ToggleWidget', () => {
  describe('booleans', () => {
    it('should return isEnum=false', () => {
      const wrapper = shallow(<ToggleWidget schema={{ schema: { type: 'boolean' } }} />);
      expect(wrapper.instance().isEnum).toBe(false);
    });
    it('should render not checked by default', () => {
      const wrapper = shallow(<ToggleWidget schema={{ schema: { type: 'boolean' } }} />);
      expect(wrapper.find('Toggle').props().checked).toBe(false);
    });
    it('should render checked if value true', () => {
      const wrapper = shallow(<ToggleWidget schema={{ schema: { type: 'boolean' } }} value={true} />);
      expect(wrapper.find('Toggle').props().checked).toBe(true);
    });
  });

  describe('enumOptions', () => {
    it('should return isEnum=true', () => {
      const wrapper = shallow(<ToggleWidget schema={{ schema: {} }} options={{ enumOptions }} />);
      expect(wrapper.instance().isEnum).toBe(true);
    });
    it('should render checked if value true', () => {
      const wrapper = shallow(<ToggleWidget schema={{ schema: {} }} value={'yes'} options={{ enumOptions }} />);
      expect(wrapper.find('Toggle').props().checked).toBe(true);
    });

    it('should render checked if value true', () => {
      const wrapper = shallow(<ToggleWidget schema={{ schema: {} }} value={'no'} options={{ enumOptions }} />);
      expect(wrapper.find('Toggle').props().checked).toBe(false);
    });

    it('should render checked if value true', () => {
      const wrapper = shallow(<ToggleWidget schema={{ schema: {} }} options={{ enumOptions }} />);
      expect(wrapper.find('Toggle').props().checked).toBe(false);
    });
  });
  describe('handleOnChange', () => {
    it('should toggle to true', async () => {
      const spy = jest.fn();
      const wrapper = shallow(<ToggleWidget schema={{ schema: { type: 'boolean' } }} onChange={spy} />);
      wrapper.find('Toggle').simulate('change');
      await new Promise(setImmediate);
      expect(spy).toHaveBeenCalledWith(true);
    });
    it('should toggle to true if initial false', async () => {
      const spy = jest.fn();
      const wrapper = shallow(<ToggleWidget schema={{ schema: { type: 'boolean' } }} value={false} onChange={spy} />);
      wrapper.find('Toggle').simulate('change');
      await new Promise(setImmediate);
      expect(spy).toHaveBeenCalledWith(true);
    });
    it('should toggle to false', async () => {
      const spy = jest.fn();
      const wrapper = shallow(<ToggleWidget schema={{ schema: { type: 'boolean' } }} value={true} onChange={spy} />);
      wrapper.find('Toggle').simulate('change');
      await new Promise(setImmediate);
      expect(spy).toHaveBeenCalledWith(false);
    });
    it('should toggle to yes', async () => {
      const spy = jest.fn();
      const wrapper = shallow(<ToggleWidget schema={{ schema: {} }} options={{ enumOptions }} onChange={spy} />);
      wrapper.find('Toggle').simulate('change');
      await new Promise(setImmediate);
      expect(spy).toHaveBeenCalledWith('yes');
    });
    it('should toggle to yes if initial no', async () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <ToggleWidget schema={{ schema: {} }} options={{ enumOptions }} value="no" onChange={spy} />
      );
      wrapper.find('Toggle').simulate('change');
      await new Promise(setImmediate);
      expect(spy).toHaveBeenCalledWith('yes');
    });
    it('should toggle to yes', async () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <ToggleWidget schema={{ schema: {} }} options={{ enumOptions }} value="yes" onChange={spy} />
      );
      wrapper.find('Toggle').simulate('change');
      await new Promise(setImmediate);
      expect(spy).toHaveBeenCalledWith('no');
    });
    it('should call onFocus with the id', () => {
      const spy = jest.fn();
      const wrapper = shallow(<ToggleWidget schema={{ schema: { type: 'boolean' } }} onFocus={spy} id="some-id" />);
      wrapper.find('Toggle').simulate('change');
      expect(spy).toHaveBeenCalledWith('some-id');
    });
  });

  describe('toggle icons', () => {
    it('should ToggleIconOff render as OFF', () => {
      expect(
        shallow(<ToggleIconOff />)
          .find('p')
          .text()
      ).toEqual('OFF');
    });
    it('should ToggleIconOn render as ON', () => {
      expect(
        shallow(<ToggleIconOn />)
          .find('p')
          .text()
      ).toEqual('ON');
    });
  });
});
