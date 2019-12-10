import React, { Component } from 'react';
import ColorPicker from '../ColorPicker';
import DemoInput from '../DemoInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.getPickerOptions = this.getPickerOptions.bind(this);
  }
  state = {
    color: '#c71cb6',
    on: true,
    colorOptions: {
      syncColors: [],
      callSave: [],
      callCancel: [],
    },
    style_options: {},
    // colors: [],
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
    if (settings[3]) obj_options['colors'] = settings[3];

    this.setState({
      ...this.opposite_state,
      ...obj_options,
      on: true,
    });
  }

  render() {
    const { color, on, colorOptions, style_options } = this.state;
    let obj = {
      on,
      color,
      options: colorOptions,
      style_options,
    };
    // let ColorOptions = { color, ...colorOptions };
    return (
      <div>
        <DemoInput getPickerOptions={this.getPickerOptions} />
        <ColorPicker {...obj} />
      </div>
    );
  }
}

export default App;
