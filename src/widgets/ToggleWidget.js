import React from 'react';
import Toggle from 'react-toggle';

export const ToggleIconOff = () => (
  <div style={{ width: 22, height: 22, paddingTop: '5px' }}>
    <p style={{ fontSize: '10px', fontWeight: 'bold', color: 'black' }}>OFF</p>
  </div>
);

export const ToggleIconOn = () => (
  <div style={{ width: 22, height: 22, paddingTop: '5px' }}>
    <p style={{ fontSize: '10px', fontWeight: 'bold', color: 'white' }}>ON</p>
  </div>
);

export class ToggleWidget extends React.Component {
  static defaultProps = {
    onChange: () => {}
  };
  get isEnum() {
    return !!(this.props.schema.type !== 'boolean' && this.props.options && this.props.options.enumOptions);
  }
  get checked() {
    let valueProp = this.props.value;
    const optionsProp = this.props.options || {};
    if (typeof valueProp === 'undefined' && typeof optionsProp.placeholder !== 'undefined') {
      valueProp = optionsProp.placeholder;
    }
    if (this.isEnum) {
      return this.props.options.enumOptions.findIndex(({ value }) => value === valueProp) > 0;
    } else {
      return !!valueProp;
    }
  }
  handleOnChange = () => {
    const val = this.isEnum ? this.props.options.enumOptions[1 * !this.checked].value : !this.checked;
    this.props.onFocus && this.props.onFocus(this.props.id);

    setImmediate(() => this.props.onChange(val));
  };
  render = () => {
    return (
      <Toggle
        icons={{ checked: <ToggleIconOn />, unchecked: <ToggleIconOff /> }}
        checked={this.checked}
        disabled={this.props.disabled || this.props.readonly}
        onChange={this.handleOnChange}
      />
    );
  };
}

export default ToggleWidget;
