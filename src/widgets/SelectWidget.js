import React from 'react';
import PropTypes from 'prop-types';

import { asNumber, guessType } from 'react-jsonschema-form/lib/utils';
import Select from 'react-select';
const nums = new Set(['number', 'integer']);

const customStyles = {
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    height: '40px'
    // 'min-height': '40px',
  })
};

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
export function processValue(schema, value) {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema;
  if (value === '') {
    return undefined;
  } else if (type === 'array' && items && nums.has(items.type)) {
    return value.map(asNumber);
  } else if (type === 'boolean') {
    return value === 'true';
  } else if (type === 'number') {
    return asNumber(value);
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every(x => guessType(x) === 'number')) {
      return asNumber(value);
    } else if (schema.enum.every(x => guessType(x) === 'boolean')) {
      return value === 'true';
    }
  }

  return value;
}

export function getValue(item, multiple) {
  if (multiple) {
    return (item || []).map(({ value }) => value);
  } else if (item) {
    return item.value;
  }
}

export class SelectWidget extends React.Component {
  get mappedOptions() {
    const {
      options: { enumOptions, enumDisabled }
    } = this.props;
    return enumOptions.map(({ value, label }, i) => {
      const isDisabled = enumDisabled && enumDisabled.indexOf(value) !== -1;
      return { value, label, isDisabled };
    });
  }
  get defaultValue() {
    const { value, multiple } = this.props;
    return multiple
      ? this.mappedOptions.filter(it => value.includes(it.value))
      : this.mappedOptions.find(it => it.value === value);
  }

  processValue = newValue => processValue(this.props.schema, newValue);

  handleOnBlur = event => {
    const newValue = getValue(this.defaultValue, this.props.multiple);
    this.props.onBlur(this.props.id, this.processValue(newValue));
  };
  handleOnFocus = event => {
    const newValue = getValue(this.defaultValue, this.props.multiple);
    this.props.onFocus(this.props.id, this.processValue(newValue));
  };

  handleOnChange = event => {
    const newValue = getValue(event, this.props.multiple);
    this.props.onChange(this.processValue(newValue));
  };

  render() {
    const props = this.props;
    const { id, required, disabled, readonly, multiple, autofocus, options } = props;
    return (
      <Select
        id={id}
        isMulti={!!multiple}
        value={this.defaultValue}
        className="basic-multi-select"
        classNamePrefix="select"
        defaultValue={this.defaultValue}
        required={required}
        isDisabled={disabled || readonly}
        placeholder={this.props.placeholder}
        autoFocus={autofocus}
        components={options.components}
        styles={customStyles}
        onBlur={this.handleOnBlur}
        onFocus={this.handleOnFocus}
        onChange={this.handleOnChange}
        options={this.mappedOptions}
      />
    );
  }
}

SelectWidget.defaultProps = {
  autofocus: false,
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {}
};

if (process.env.NODE_ENV !== 'production') {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };
}

export default SelectWidget;
