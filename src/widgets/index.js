import React from 'react';
import color from './ColorPickerWidget';
import numericRangeSelect from './NumericRangeWidget';
import select from './SelectWidget';
import toggle from './ToggleWidget';
import locationSelector from './LocationSelectorWidget';

export default {
  color,
  select,
  numericRangeSelect,
  toggle,
  locationSelector,
  text: props => {
    const { BaseInput } = props.registry.widgets;
    return <BaseInput {...props} autoComplete="off" />;
  },
  boxShadow: props => {
    const { BaseInput } = props.registry.widgets;
    return <BaseInput {...props} autoComplete="off" />;
  }
};
