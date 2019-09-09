import React, { Component } from "react";
import convert from "../../options/convert";
import { ThemeStore } from "../../interfaces";
import { connect } from "react-redux";
import * as Action from "../../actions";

interface StateProps {
  opacity: number;
}

interface DispatchProps {
  add_color: (n: number) => void;
}

type Props = StateProps & DispatchProps;

class RegulateOpacity extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.cPos = this.cPos.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  regulateLine: any = React.createRef();

  line = {
    w: 0,
    h: 0,
    left: 0,
    x: 0
  };
  state = {
    left: 0
  };
  lineMove = false;

  hookDidMount() {
    const { line } = this;
    line.x = line.w / 100;
    this.setState({ left: line.w });
  }

  componentDidMount() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.left = elem.getBoundingClientRect().left;

    line.x = line.w / 100;
    this.setState({ left: line.w });

    elem.onclick = this.cPos;
    elem.onmousedown = () => {
      this.lineMove = true;
      document.onmousemove = this.cPos;

      document.onmouseup = () => {
        document.onmousemove = null;
        this.lineMove = false;
      };
    };

    elem.addEventListener("touchstart", this.touchStart, false);
    elem.addEventListener("touchend", this.touchEnd, false);
    elem.addEventListener("touchmove", this.touchMove, false);
  }

  touchStart(e: any) {
    this.lineMove = true;
    this.touchMove(e);
  }
  touchEnd(e: any) {
    this.lineMove = false;
    this.touchMove(e);
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

  handleDown(e: any) {
    this.lineMove = true;
    document.onmousemove = this.cPos;

    document.onmouseup = () => {
      document.onmousemove = null;
      this.lineMove = false;
    };
  }
  hookCPos() {
    const { left } = this.state;
    const { line } = this;
    let opacity: number = +(Math.floor(left / line.x) * 0.01).toFixed(2);
    this.props.add_color(opacity);
  }

  cPos(c: any) {
    const { line } = this;
    let left, a;
    left = c.clientX - line.left;
    a = left < 0 ? 0 : left;
    a = a > line.w ? line.w : a;
    this.setState({ left: a });

    let opacity: number = +(Math.floor(a / line.x) * 0.01).toFixed(2);
    this.props.add_color(opacity);
  }

  getLeft(): string {
    let { opacity } = this.props;
    let left = (opacity * this.line.x) / 0.01 + "px";
    return left;
  }
  render() {
    let left: string | number = "";
    const { lineMove, line } = this;
    const { opacity } = this.props;
    if (lineMove) {
      left = this.state.left;
    } else {
      left = (opacity * line.x) / 0.01 + "px";
    }
    const style = {
      left
    };

    return (
      <div className="wrap_line_color opacity" ref={this.regulateLine}>
        <div className="opacity_color line_color" id="opacity_color">
          <div className="linear_cover"></div>
        </div>
        <div
          className="picker_slider"
          id="opacity_circle"
          onMouseDown={this.handleDown}
          onClick={this.cPos}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          style={style}
        ></div>
      </div>
    );
  }
}
const mapStateToProps = ({ opacity }: any): StateProps => {
  return {
    opacity
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    add_color: (opacity: number) => {
      dispatch(Action.change_opacity(opacity));
    }
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegulateOpacity);
