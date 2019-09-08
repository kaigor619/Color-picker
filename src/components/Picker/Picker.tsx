import React, { Component } from "react";
import PickerCircle from "./PickerCircle";
import { ThemeStore } from "../../interfaces";
import { connect } from "react-redux";
import convert from "../../options/convert";

interface StateProps {
  H: number;
}
interface DispatchProps {}
interface OwnProps {
  width: number;
  height: number;
}

type Props = StateProps & OwnProps;

export interface BlockOptions {
  width: number;
  height: number;
  pxX: number;
  pxY: number;
}

class Picker extends Component<Props> {
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
    block.onClick = () => {
      console.log("click");
    };
  }
  render() {
    const { left, top } = this.state;
    const { pxX, pxY, width, height } = this.block;
    let { H } = this.props;
    let rgb = "rgb(" + convert.hsv_rgb(H, 100, 100) + ")";

    const style = {
      width,
      height,
      background:
        "linear-gradient(to top, rgb(0, 0, 0), transparent), linear-gradient(to left, " +
        rgb +
        ", rgb(255, 255, 255))"
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
          position={{ left, top }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ H }: any): StateProps => {
  return {
    H
  };
};

export default connect<StateProps>(
  mapStateToProps,
  {}
)(Picker);
