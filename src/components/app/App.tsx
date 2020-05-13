import React, { Component } from 'react';
import ColorPicker from '../ColorPicker';
import DemoInput from '../DemoInput';

class App extends Component {
  render() {
    return (
      <div>
        <DemoInput />
        <ColorPicker />
      </div>
    );
  }
}

export default App;
