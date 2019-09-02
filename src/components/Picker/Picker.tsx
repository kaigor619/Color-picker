import React, { Component } from "react";
import PickerCircle from "./PickerCircle";

export interface ObjPicker {
  width: number;
  height: number;
}

export interface BlockOptions {
  width: number;
  height: number;
  pxX: number;
  pxY: number;
}

class Picker extends Component<ObjPicker> {
  state = {
    left: 0,
    top: 0
  };

  circle = {
    width: 12,
    height: 12
  };

  block: BlockOptions = {
    width: this.props.width,
    height: this.props.height,
    pxX: this.props.width / 100,
    pxY: this.props.height / 100
  };

  blockRef: any = React.createRef();

  componentDidMount() {
    let block = this.blockRef.current;
    let { left, top } = block.getBoundingClientRect();
    this.setState({
      left,
      top
    });
  }
  render() {
    const { left, top } = this.state;
    const { pxX, pxY, width, height } = this.block;
    const style = {
      width,
      height
    };
    return (
      <div
        ref={this.blockRef}
        className="block_picker"
        id="block_picker"
        style={style}
      >
        <PickerCircle
          dataCircle={{ ...this.circle }}
          dataBlock={{ left, top, width, height, pxX, pxY }}
        />
      </div>
    );
  }
}

export default Picker;
