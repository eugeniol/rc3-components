import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';
export class ColorPickerWidget extends React.Component {
  state = {
    displayColorPicker: false
  };

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
    // value:  '#000'
  };

  handleClick = () => this.setState({ displayColorPicker: !this.state.displayColorPicker });

  handleClose = () => this.setState({ displayColorPicker: false });

  handleChange = color => {
    const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    setImmediate(() => this.props.onChange(rgba));
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          display: 'inline-block',
          verticalAlign: 'middle',
          width: '36px',
          height: '100%',
          marginRight: '5px',
          borderRadius: '2px',
          background: this.props.value || this.props.placeholder
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          display: 'inline-block',
          cursor: 'pointer',
          width: '65px'
        },
        popover: {
          position: 'absolute',
          zIndex: '2'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick} className="form-control">
          <span style={styles.color} />
          <span className="caret"></span>
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={this.props.value || this.props.placeholder} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPickerWidget;
