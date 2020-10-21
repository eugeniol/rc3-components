import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, mount } from 'enzyme';
import { ProductTypeAhead } from '../ProductTypeAhead';
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead';
import api from 'api';
import { isRegExp } from 'util';
import MerchantContext from 'contexts/MerchantContext';

jest.mock('api');
api.get.mockResolvedValue({});

Enzyme.configure({ adapter: new Adapter() });

const formData = { name: 'yum name' };

describe('ProductTypeAhead', () => {
  describe('initial state', () => {
    it('should set initial state', () => {
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      expect(wrapper.state()).toEqual({
        options: [],
        isLoading: false,
        selected: [
          {
            name: 'yum name'
          }
        ]
      });
    });
  });
  describe('renderMenuItemChildren', () => {
    it('should return two nodes', () => {
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      const actual = wrapper
        .instance()
        .config.renderMenuItemChildren(
          { name: 'yum name', external_product_id: 'yum external_product_id' },
          { text: 'yum text' }
        );
      expect(actual.length).toBe(2);
    });
    it('should return Highlighter', () => {
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      const actual = wrapper
        .instance()
        .config.renderMenuItemChildren(
          { name: 'yum name', external_product_id: 'yum external_product_id' },
          { text: 'yum text' }
        )[0];
      expect(actual.type).toBe(Highlighter);
      expect(actual.props.search).toBe('yum text');
      expect(actual.props.children).toBe('yum name');
    });
    it('should return div containing external_product_id', () => {
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      const actual = wrapper
        .instance()
        .config.renderMenuItemChildren(
          { name: 'yum name', external_product_id: 'yum external_product_id' },
          { text: 'yum text' }
        )[1];
      expect(actual.props.children.props.children.includes('yum external_product_id')).toBe(true);
    });
  });
  describe('lookupProducts', () => {
    it('should call setState', () => {
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      const spy = jest.spyOn(wrapper.instance(), 'setState');
      wrapper.instance().lookupProducts();
      expect(spy).toBeCalledWith({ isLoading: true });
      spy.mockRestore();
    });
    it('should have merchant context', () => {
      expect(ProductTypeAhead.contextType).toEqual(MerchantContext);
    });
    it('should call get passing context as merchant id', () => {
      api.get.mockClear();
      const merchantId = 'foo-bar';

      const wrapper = mount(
        <MerchantContext.Provider value={merchantId}>
          <ProductTypeAhead formData={formData} />
        </MerchantContext.Provider>
      );
      wrapper
        .find(ProductTypeAhead)
        .instance()
        .lookupProducts('yum query');
      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith(`/products/?merchant_public_id=${merchantId}&id_or_name=yum query`);
    });
    it('should call setState given api success', async () => {
      api.get.mockClear();
      api.get.mockResolvedValue({ results: ['yum result'] });
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      const spy = jest.spyOn(wrapper.instance(), 'setState');
      await wrapper.instance().lookupProducts('yum query');
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({
        isLoading: false,
        options: ['yum result']
      });
      spy.mockRestore();
    });
    it('should return rejected promise given api failure', async () => {
      api.get.mockClear();
      api.get.mockRejectedValueOnce({ 'yum key': 'yum value' });
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      await wrapper
        .instance()
        .lookupProducts('yum query')
        .then(() => expect(false).toBe(true))
        .catch(err => expect(err.message).toBe("Can't get products"));
    });
  });
  describe('onChange', () => {
    it('should call setState', () => {
      const wrapper = mount(<ProductTypeAhead formData={formData} onChange={jest.fn()} />);
      const asyncTypeahead = wrapper.find(AsyncTypeahead);
      const spy = jest.spyOn(wrapper.instance(), 'setState');
      asyncTypeahead.props().onChange(['yum selected']);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ selected: ['yum selected'] });
      spy.mockRestore();
    });
    it('should call onChange', () => {
      const spy = jest.fn();
      const wrapper = mount(<ProductTypeAhead formData={formData} onChange={spy} />);
      const asyncTypeahead = wrapper.find(AsyncTypeahead);
      asyncTypeahead.props().onChange([
        {
          name: 'yum name',
          external_product_id: 'yum external_product_id'
        }
      ]);
      expect(spy).toHaveBeenCalledWith([
        {
          external_product_id: 'yum external_product_id',
          name: 'yum name'
        }
      ]);
      spy.mockRestore();
    });
  });
  describe('render', () => {
    it('should pass renderMenuItemChildren function to AsyncTypeahead', () => {
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      const expected = wrapper.props().renderMenuItemChildren;
      const actual = wrapper.find(AsyncTypeahead).props().renderMenuItemChildren;
      expect(actual).toBe(expected);
    });
    it('should pass isLoading to AsyncTypeahead', () => {
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      wrapper.setState({ isLoading: true });
      expect(wrapper.find(AsyncTypeahead).props().isLoading).toBe(true);
      wrapper.setState({ isLoading: false });
      expect(wrapper.find(AsyncTypeahead).props().isLoading).toBe(false);
    });
    it('should pass onSearch to AsyncTypeahead', () => {
      const expected = 'yum return value';
      const spy = jest.spyOn(ProductTypeAhead.prototype, 'lookupProducts').mockReturnValue(expected);
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      const actual = wrapper
        .find(AsyncTypeahead)
        .props()
        .onSearch();
      expect(actual).toBe(expected);
      spy.mockRestore();
    });
    it('should pass selected to AsyncTypeahead', () => {
      const expected = 'yum selected';
      const wrapper = shallow(<ProductTypeAhead formData={formData} />);
      wrapper.setState({ selected: expected });
      const actual = wrapper.find(AsyncTypeahead).props().selected;
      expect(actual).toBe(expected);
    });
  });
});
