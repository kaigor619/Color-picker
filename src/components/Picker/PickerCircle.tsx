import React, { Component } from "react";
import * as Redux from "redux";
import { connect } from "react-redux";
import { ThemeStore } from "../../interfaces";
import * as Action from "../../actions";
import convert from "../../options/convert";

interface StateProps {
  rgb_val: number[];
  S: number;
  V: number;
}

interface DispatchProps {
  add_color: (mas: any) => void;
}

interface OwnProps {
  dataCircle: { width: number; height: number };
  dataBlock: {
    width: number;
    height: number;
    left: number;
    top: number;
    pxX: number;
    pxY: number;
    rgb_val?: [];
  };
  position: {
    left: number;
    top: number;
  };
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
  left: number;
  top: number;
}

class PickerCircle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }
  rgb_val = [];
  state = {
    left: 0,
    top: 0
  };
  circleMove = false;
  handleMouseDown(e: any): void {
    const { width, height, pxX, pxY } = this.props.dataBlock;
    let positX = this.props.dataBlock.left;
    let positY = this.props.dataBlock.top;

    this.circleMove = true;

    document.onmousemove = (c: any) => {
      let left = c.clientX - positX;
      let top = c.clientY - positY;

      // Проверка left
      left = left < 0 ? 0 : left;

      left = left > width ? width : left;
      // Проверка top

      top = top > height ? height : top;
      top = top < 0 ? 0 : top;

      const S = Math.ceil(left / pxX);
      const V = Math.ceil(Math.abs(top / pxY - 100));

      this.setState({ top, left });
      this.props.add_color([null, S, V]);
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      this.circleMove = false;
    };
  }
  render() {
    const { width, height } = this.props.dataCircle;
    const backgroundColor = convert.rgb_string(this.props.rgb_val);
    let left, top;
    if (this.circleMove) {
      left = this.state.left;
      top = this.state.top;
    } else {
      const { pxX, pxY } = this.props.dataBlock;
      const { S, V } = this.props;
      left = pxX * S + "px";
      top = pxY * Math.abs(V - 100) + "px";
    }
    const style = {
      width,
      height,
      left,
      top,
      backgroundColor
    };
    return (
      <div
        className="picker_circle"
        id="picker_circle"
        style={style}
        onMouseDown={this.handleMouseDown}
      ></div>
    );
  }
}

function mapStateToProps({ rgb_val, S, V }: any): StateProps {
  return {
    rgb_val,
    S,
    V
  };
}

const mapDispatchToProps: DispatchProps = {
  add_color: Action.change_hsv
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PickerCircle);
