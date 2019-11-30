import React, { Component, createRef } from 'react';
import { IColorsOptions } from '../../interfaces';
import ColorPicker from '../ColorPicker';
import CP from './CP';

class App extends Component<any, any> {
  swatch: any = createRef();
  input: any = createRef();
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

  constructor(props) {
    super(props);
    this.syncColor = this.syncColor.bind(this);
    this.cancelColor = this.cancelColor.bind(this);
    this.saveColor = this.saveColor.bind(this);
  }

  syncColor(color) {
    this.swatch.current.style.backgroundColor = color;
    this.input.current.value = color;
  }
  saveColor(color, prevColor) {
    this.setState({ color, on: false });
    this.swatch.current.backgroundColor = color;
  }
  cancelColor(color, prevColor) {
    this.setState({ color: prevColor, on: false });
    this.swatch.current.style.backgroundColor = prevColor;
  }

  handleChange(e) {
    this.setState({ color: e.target.value });
  }
  handleClick(e) {
    this.setState({ on: true });
  }
  handleClickScale() {
    let { width } = this.state.picker_settings.picker;
    width += 10;
    this.setState(state => {
      return {
        picker_settings: {
          ...state.picker_settings,
          picker: { ...state.picker_settings.picker, width },
        },
      };
    });
  }

  render() {
    const { color, on } = this.state;
    let ColorOptions = { ...this.state.colorOptions, on, color };
    console.log('renderApp');
    return (
      <div>
        <div className="picker_demonstration">
          <div className="wrap_my_swatch">
            <div className="my_swatch_opacity"></div>
            <div
              className="my_swatch"
              id="my_swatch"
              onClick={this.handleClick.bind(this)}
              ref={this.swatch}
            ></div>
          </div>
          <input
            type="text"
            onChange={this.handleChange.bind(this)}
            className="my_color_value"
            id="my_swatch_input"
            ref={this.input}
            value={color}
          />
        </div>
        <button onClick={() => this.handleClickScale()}>width++ </button>

        <ColorPicker
          options={ColorOptions}
          style_options={this.state.picker_settings}
        />
      </div>
    );
  }
}

export default App;
