import React, { Component, createRef } from "react";
import { Ifunctions, IColorsOptions } from "../../interfaces";
import ColorPicker from "../ColorPicker";



class App extends Component<any, any> {
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
  swatch: any = createRef();
  input: any = createRef();
  state = {
    color: "hsla(154, 64%, 44%, 0.22)",
    on: false
  };

  render() {
    const { color, on } = this.state;
    let ColorOptions: IColorsOptions = {
      color,
      syncColors: [this.syncColor],
      callSave: [this.saveColor],
      callCancel: [this.cancelColor],
      on
    };

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
        <ColorPicker options={ColorOptions} />
      </div>
    );
  }
}

export default App;
