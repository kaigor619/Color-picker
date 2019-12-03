import React, { Component, createRef } from 'react';
import { IColorsOptions } from '../../interfaces';
import ColorPicker from '../ColorPicker';
import DemoInput from '../DemoInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.getPickerOptions = this.getPickerOptions.bind(this);
  }
  state = {
    color: '#c71cb6',
    on: false,
    colorOptions: {
      syncColors: [],
      callSave: [],
      callCancel: [],
    },
    style_options: {},
  };
  opposite_state = {
    color: null,
    style_options: {},
    colorOptions: {},
  };
  getPickerOptions(...settings) {
    let obj_options = {};
    if (settings[0]) obj_options['color'] = settings[0];
    if (settings[1]) obj_options['colorOptions'] = settings[1];
    if (settings[2]) obj_options['style_options'] = settings[2];

    this.setState({
      ...this.opposite_state,
      ...obj_options,
      on: true,
    });
  }

  render() {
    const { color, on, colorOptions, style_options } = this.state;
    let ColorOptions = { color, ...colorOptions };
    return (
      <div>
        <DemoInput getPickerOptions={this.getPickerOptions} />
        <ColorPicker
          on={on}
          options={ColorOptions}
          style_options={style_options}
        />
      </div>
    );
  }
}

export default App;
