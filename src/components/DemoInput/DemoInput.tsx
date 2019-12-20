import React, { Component } from 'react';
import withDataCP from '../hoc/withDataCP';

interface OwnProps {
  getPickerOptions: (...arg) => void;
  setColor: (color, options) => void;
  setColors: (colors) => void;
  setStyleOptions: (style_options) => void;
  switchOn: () => void;
  switchOff: () => void;
  colorsCP: any;
}
type Props = OwnProps;
class DemoInput extends Component<Props> {
  state = {
    color: 'hsla(154, 64%, 44%, 0.22)',
    on: false,
    picker_settings: {
      picker: {
        width: 300,
        height: 160,
      },
      circle: {
        width: 15,
        height: 15,
      },
    },
    colorOptions: {
      syncColors: [this.syncColor.bind(this)],
      callSave: [this.saveColor.bind(this)],
      callCancel: [this.cancelColor.bind(this)],
    },
  };
  colors = [
    { name: 'dwdw', color: '#F44336', id: 'q' },
    { name: 'fefef', color: '#E91E63', id: 'w' },
    { name: 'fefe', color: 'rgb(156, 39, 176)', id: 'e' },
    { name: 'Color 4', color: 'hsl(262, 52%, 47%)', id: 'r' },
    { name: 'Color 5', color: '#3F51B5', id: 't' },
    { name: 'Color 6', color: '#2196F3', id: 'y' },
    { name: 'Color 7', color: '#03A9F4', id: 'u' },
    { name: 'Color 8', color: '#009688', id: 'i' },
    { name: 'Color 9', color: '#4CAF50', id: 'o' },
    { name: 'Color 10', color: '#8BC34A', id: 'p' },
  ];

  syncColor(color) {
    this.setState({ color });
  }
  saveColor(color, prevColor) {
    this.setState({ color });
  }
  cancelColor(color, prevColor) {
    this.setState({ color: prevColor });
  }

  handleChange(e) {
    this.setState({ color: e.target.value });
  }
  handleClick() {
    const { color, colorOptions } = this.state;
    this.props.setColors(this.colors);
    this.props.setColor(color, colorOptions);
  }
  handleClickScale() {
    let width = 500;
    this.props.setStyleOptions({ picker: { width } });
    this.props.colorsCP.add('rgb(0,0,0)', 'simple black');
    this.props.colorsCP.remove('Color 5');
    this.props.colorsCP.change('Color 6', '666');
  }

  render() {
    const { color } = this.state;
    return (
      <div>
        <div className="picker_demonstration">
          <div className="wrap_my_swatch">
            <div className="my_swatch_opacity"></div>
            <div
              className="my_swatch"
              id="my_swatch"
              onClick={() => this.handleClick()}
              style={{ backgroundColor: color }}
            ></div>
          </div>
          <input
            type="text"
            onChange={e => this.handleChange(e)}
            className="my_color_value"
            id="my_swatch_input"
            value={color}
          />
        </div>
        <button onClick={() => this.handleClickScale()}>width++ </button>
      </div>
    );
  }
}

export default withDataCP(DemoInput);
