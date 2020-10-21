import React from 'react';
import { SelectWidget } from './SelectWidget';
import PropTypes from 'prop-types';
export const fillOptions = (a, b) =>
  Array.from(
    Array(Math.max(a, b) - Math.min(a, b) + 1).keys(),
    (min => x => {
      const num = x + min;
      return {
        value: num,
        label: num
      };
    })(Math.min(a, b))
  )[a <= b ? 'concat' : 'reverse']();

export const NumericRangeWidget = ({ schema: { minimum, maximum, ...schema }, options, ...props }) => (
  <SelectWidget
    {...props}
    schema={{ minimum, maximum, ...schema }}
    options={{ ...options, enumOptions: fillOptions(minimum, maximum) }}
  />
);
NumericRangeWidget.propTypes = {
  schema: PropTypes.object.isRequired
};

export default NumericRangeWidget;
