import React, { Component, createRef } from 'react';
import { Ifunctions, IColorsOptions } from '../../interfaces';
import ColorPicker from '../ColorPicker';

class App extends Component<any, any> {
  constructor(props) {
    super(props);
    this.syncColor = this.syncColor.bind(this);
    this.cancelColor = this.cancelColor.bind(this);
    this.saveColor = this.saveColor.bind(this);
  }
  syncColor(color) {
    // this.swatch.current.style.backgroundColor = color;
    // this.input.current.value = color;
    this.setState({ syncColor: color });
  }
  saveColor(color, prevColor) {
    this.setState({ color, sync: false, on: false });

    // this.swatch.current.backgroundColor = color;
  }
  cancelColor(color, prevColor) {
    this.setState({ color: prevColor, sync: false });
    // this.swatch.current.backgroundColor = prevColor;
  }

  handleChange(e) {
    this.setState({ color: e.target.value });
  }
  handleClick(e) {
    this.setState({ on: true, sync: true });
  }
  swatch: any = createRef();
  input: any = createRef();
  state = {
    color: '#fff',
    syncColor: '#fff',
    sync: false,
    on: false,
  };

  render() {
    let { color, on, sync, syncColor } = this.state;
    if (sync) color = syncColor;

    let ColorOptions: IColorsOptions = {
      color: this.state.color,
      syncColors: [this.syncColor],
      callSave: [this.saveColor],
      callCancel: [this.cancelColor],
      on,
    };

    return (
      <div>
        <div className="picker_demonstration">
          <div className="wrap_my_swatch">
            <div className="my_swatch_opacity"></div>
            <div
              className="my_swatch"
              style={{ color }}
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
        <ColorPicker options={ColorOptions} />
      </div>
    );
  }
}

export default App;
