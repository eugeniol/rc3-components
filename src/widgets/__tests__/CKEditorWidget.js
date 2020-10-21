import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
import CKEditorWidget from '../CKEditorWidget';
Enzyme.configure({ adapter: new Adapter() });

describe('CKEditorWidget', () => {
  it('should render CKEditor', () => {
    const wrapper = shallow(<CKEditorWidget value="testValue" />);
    expect(wrapper.find('CKEditor')).toHaveLength(1);
  });
});
