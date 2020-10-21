import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, mount } from 'enzyme';
import { FilterSelect } from '../FilterSelect';
import Select from 'react-select';
Enzyme.configure({ adapter: new Adapter() });
describe('FilterSelect tests', () => {
  it('should bypass uiSchema.options to react-select', () => {
    const app = shallow(<FilterSelect uiSchema={{ options: [{ value: { id: 1 } }] }} />);

    expect(app.find(Select)).toHaveLength(1);

    expect(app.find(Select).props().options).toEqual([{ value: { id: 1 } }]);
  });
  it('should filter options', () => {
    const uiSchema = {
      excludeValueIds: [1],
      options: [{ value: { id: 1 } }]
    };

    const app = shallow(<FilterSelect uiSchema={uiSchema} />);

    expect(app.find(Select)).toHaveLength(1);

    expect(app.find(Select).props().filterOption).toBeTruthy();
  });
});
