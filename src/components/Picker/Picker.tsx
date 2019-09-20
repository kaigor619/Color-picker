import React, { Component } from "react";
import { ThemeStore } from "../../interfaces";
import * as Action from "../../actions";
import { connect } from "react-redux";
import Convert from "../../options/convert";
import Model from "../../options/modelsColor";

// Интерфейсы
interface StateProps {
  H: number;
  S: number;
  V: number;
  rgbMain: number[];
}
interface DispatchProps {
  add_color: (mas: any) => void;
}
interface OwnProps {
  width: number;
  height: number;
}

interface IStyleBlock {
  width: number;
  height: number;
  background: string;
}

interface IStyleCircle {
  width: number;
  height: number;
  backgroundColor: string;
  left: number;
  top: number;
}
type Props = StateProps & OwnProps & DispatchProps;

// Компонент
class Picker extends Component<Props> {
  state = {
    left: 0,
    top: 0
  };
  circle = {
    width: 12,
    height: 12
  };

  block = {
    width: this.props.width,
    height: this.props.height,
    pxX: this.props.width / 100,
    pxY: this.props.height / 100,
    left: 0,
    top: 0
  };

  blockRef: any = React.createRef();
  circleMove = false;

  constructor(props: Props) {
    super(props);
    this.cPos = this.cPos.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }

  cPos(c: any) {
    const { width, height, pxX, pxY, left: positX, top: positY } = this.block;

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
  }

  touchMove(e: any) {
    var touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const newEvent = {
        clientX: touches[i].pageX,
        clientY: touches[i].pageY
      };
      this.cPos(newEvent);
    }
  }

  componentDidMount() {
    let block = this.blockRef.current;
    let { left, top } = block.getBoundingClientRect();
    this.block.left = left;
    this.block.top = top;

    block.onclick = this.cPos;
    block.onmousedown = () => {
      this.circleMove = true;
      document.onmousemove = this.cPos;

      document.onmouseup = () => {
        document.onmousemove = null;
        this.circleMove = false;
      };
    };

    block.addEventListener("touchstart", this.touchMove, false);
    block.addEventListener("touchend", this.touchMove, false);
    block.addEventListener("touchmove", this.touchMove, false);
  }

  getStyleBlock(): IStyleBlock {
    const { width, height } = this.block;
    let { H } = this.props;
    let rgb = "rgb(" + Convert.hsv_rgb(H, 100, 100) + ")";
    let background = `linear-gradient(to top, rgb(0, 0, 0), transparent), linear-gradient(to left, 
    ${rgb} , rgb(255, 255, 255))`;

    const style = {
      width,
      height,
      background
    };
    return style;
  }

  getStyleCircle(): IStyleCircle {
    const { width, height } = this.circle;
    const backgroundColor = Model.rgb.getStr(this.props.rgbMain);
    let left, top;
    if (this.circleMove) {
      left = this.state.left;
      top = this.state.top;
    } else {
      const { pxX, pxY } = this.block;
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
    return style;
  }

  render() {
    return (
      <div
        ref={this.blockRef}
        className="block_picker"
        id="block_picker"
        style={this.getStyleBlock()}
      >
        <div
          className="picker_circle"
          id="picker_circle"
          style={this.getStyleCircle()}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = ({ H, S, V, rgbMain }: any): StateProps => {
  return {
    H,
    rgbMain,
    S,
    V
  };
};
const mapDispatchToProps: DispatchProps = {
  add_color: Action.compo_change_HSV
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Picker);
