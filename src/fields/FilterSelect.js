import React from 'react';
import Select from 'react-select';
import get from 'lodash/get';

export const mapFormDataToValue = ({ name, id }) => ({
  label: name,
  value: { id, name }
});

export const FilterSelect = props => {
  const onChange = get(props, 'onChange', () => {});
  const onFocus = get(props, 'onFocus', () => {});
  const excludeValueIds = get(props, 'uiSchema.excludeValueIds');
  const options = get(props, 'uiSchema.options', []);

  const value = options.find(({ value: { id } }) => id === get(props, 'formData.id'));

  const filter = excludeValueIds
    ? ({ value: { id } }) => {
        return !excludeValueIds.includes(id);
      }
    : () => true;

  return (
    <div style={{ width: '250px' }}>
      <Select
        filterOption={filter}
        hideSelectedOptions={true}
        value={value}
        options={options}
        onChange={({ value }) => onChange(value)}
        onFocus={() => onFocus(get(props, 'idSchema.$id', ''))}
      />
    </div>
  );
};

export default FilterSelect;
