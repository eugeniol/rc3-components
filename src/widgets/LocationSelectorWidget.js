import React from 'react';

export const fromValue = value => ((value || '').match(/\[location=["']([\.-\w\s]+)["']\]/) || [, ''])[1] || '';

export const toValue = input => (input ? `[location="${input}"]` : '');

export class LocationSelectorWidget extends React.Component {
  handleOnChange = value => {
    this.props.onChange(toValue(value));
  };

  render() {
    const props = this.props;
    const { BaseInput } = props.registry.widgets;
    return <BaseInput {...props} autoComplete="off" value={fromValue(props.value)} onChange={this.handleOnChange} />;
  }
}

export default LocationSelectorWidget;
