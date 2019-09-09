import React, { Component } from "react";
import convert from "../../options/convert";
import { connect } from "react-redux";
import * as Action from "../../actions";

interface StateProps {
  H: number;
  opacity: number;
}

interface DispatchProps {
  add_color: (n: number) => void;
  add_opacity: (n: number) => void;
}

type Props = StateProps & DispatchProps;

class RegulateTheme extends Component<Props> {
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
    left: 0
  };
  state = {
    left: 0
  };

  hookDidMount() {}

  lineMove = false;

  componentDidMount() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.left = elem.getBoundingClientRect().left;

    this.hookDidMount();

    // Events
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
  hookCPos() {}

  cPos(c: any) {
    const { line } = this;
    let left, a;
    left = c.clientX - line.left;
    a = left < 0 ? 0 : left;
    a = a > line.w ? line.w : a;
    this.setState({ left: a });

    const h = convert.getHfromPosit(a, line.w);
    this.props.add_color(h);
  }
  render() {
    let left;
    const { lineMove, line } = this;
    if (lineMove) {
      left = this.state.left;
    } else {
      const { H } = this.props;
      left = Math.abs((H - 360) * (line.w / 360)) + "px";
    }
    const style = {
      left
    };

    return (
      <div className="wrap_line_color line">
        <div
          id="ss_line"
          className="hue_color line_color"
          ref={this.regulateLine}
        ></div>
        <div
          className="picker_slider"
          id="line_circle"
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
const mapStateToProps = ({ H, opacity }: any): StateProps => {
  return {
    H,
    opacity
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    add_color: (h: number) => {
      dispatch(Action.change_h(h));
      dispatch(Action.syncRGB());
    },
    add_opacity: (opacity: number) => {
      dispatch(Action.change_opacity(opacity));
    }
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegulateTheme);
