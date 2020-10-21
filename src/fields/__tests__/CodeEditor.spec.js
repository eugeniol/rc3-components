import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
import { CodeEditor } from '../CodeEditor';
import AceEditor from 'react-ace';

Enzyme.configure({ adapter: new Adapter() });

describe('CodeEditor', () => {
  it('should pass props to AceEditor', () => {
    const props = {
      schema: { title: 'yum title' },
      uiSchema: {
        'ui:options': {
          mode: 'yum mode',
          theme: 'yum theme',
          width: 'yum width',
          height: 'yum height',
          tabSize: 30,
          showPrintMargin: true
        }
      },
      idSchema: { $id: 'yum id' },
      onChange: () => 'yum return value',
      formData: 'yum formData'
    };
    const expected = {
      name: 'yum id',
      mode: 'yum mode',
      theme: 'yum theme',
      width: 'yum width',
      height: 'yum height',
      tabSize: 30,
      showPrintMargin: true,
      value: 'yum formData'
    };
    const wrapper = shallow(<CodeEditor {...props} />);
    const actual = wrapper.find(AceEditor).props();
    expect(actual).toEqual(jasmine.objectContaining(expected));
    expect(actual.onChange()).toEqual('yum return value');
  });

  it('should pass defaults to AceEditor', () => {
    const expected = {
      mode: 'html',
      theme: 'tomorrow',
      width: '100%',
      height: '50vh',
      tabSize: 2,
      showPrintMargin: false
    };
    const wrapper = shallow(<CodeEditor />);
    const actual = wrapper.find(AceEditor).props();

    expect(actual).toEqual(jasmine.objectContaining(expected));
  });
});
