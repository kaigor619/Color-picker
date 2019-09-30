import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../actions";
// import RegulateTheme, { StateProps, DispatchProps } from "./RegulateTheme";
import { WrapLineRegulate, StyleRegulateColor, RegulateCircle } from "./styles";

export interface StateProps {
  H: number;
}

export interface DispatchProps {
  add_color: (hsv: any) => void;
}

type Props = StateProps & DispatchProps;

class RegulateColor extends Component<Props> {
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) return true;
    else return false;
  }

  componentDidMount() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.left = elem.getBoundingClientRect().left;

    this.setState({ left: line.w });

    // Events
    // elem.onclick = this.cPos;
    elem.onmousedown = e => {
      this.lineMove = true;
      this.cPos(e);
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

  cPos(c: any) {
    const { line } = this;
    let left, a;
    left = c.clientX - line.left;
    a = left < 0 ? 0 : left;
    a = a > line.w ? line.w : a;

    let h = Math.abs(Math.round(a / (line.w / 360)) - 360);
    h = h == 360 ? 0 : h;

    this.props.add_color([h, null, null]);
    this.setState({ left: a });

    // this.hookCPos();
  }

  hookCPos() {
    const { left } = this.state;
    const { line } = this;

    let h = Math.abs(Math.round(left / (line.w / 360)) - 360);
    h = h == 360 ? 0 : h;

    this.props.add_color([h, null, null]);
  }

  getStyle(): { left: string } {
    let left;

    const { lineMove, line } = this;
    if (lineMove) {
      left = this.state.left;
    } else {
      left = 10;

      const { H } = this.props;
      left = Math.abs((H - 360) * (line.w / 360));
    }
    const style = {
      left: left + "px"
    };
    return style;
  }

  render() {
    // console.log("render");
    return (
      <WrapLineRegulate>
        <StyleRegulateColor ref={this.regulateLine}></StyleRegulateColor>
        <RegulateCircle
          onMouseDown={this.handleDown}
          onClick={this.cPos}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          style={this.getStyle()}
        ></RegulateCircle>
      </WrapLineRegulate>
    );
  }
}

const mapStateToProps = ({ H }) => {
  return {
    H
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    add_color: (mas: any) => {
      dispatch(Action.compo_change_HSV(mas));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegulateColor);
