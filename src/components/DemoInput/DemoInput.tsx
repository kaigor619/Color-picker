import React, { Component } from 'react';

interface OwnProps {
  getPickerOptions: (...arg) => void;
}
type Props = OwnProps;
export default class DemoInput extends Component<Props> {
  state = {
    color: 'hsla(154, 64%, 44%, 0.22)',
    on: true,
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
    const { color, colorOptions, picker_settings } = this.state;
    this.props.getPickerOptions(color, colorOptions, picker_settings);
  }
  handleClickScale() {
    let { width } = this.state.picker_settings.picker;
    const { picker_settings } = this.state;
    width += 20;
    let res_obj = {
      ...picker_settings,
      picker: { ...picker_settings.picker, width },
    };
    this.props.getPickerOptions(null, null, res_obj);
    this.setState({
      picker_settings: res_obj,
    });
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
