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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.H !== this.props.H) return true;
    else return false;
  }

  componentDidMount() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.left = elem.getBoundingClientRect().left;

    // Events
    // elem.onclick = this.cPos;
    elem.onmousedown = e => {
      this.cPos(e);
      document.onmousemove = this.cPos;

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };

    elem.addEventListener("touchstart", this.touchStart, false);
    elem.addEventListener("touchend", this.touchEnd, false);
    elem.addEventListener("touchmove", this.touchMove, false);
  }

  touchStart(e: any) {
    this.touchMove(e);
  }
  touchEnd(e: any) {
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
    document.onmousemove = this.cPos;

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }

  cPos(c: any) {
    const { line } = this;
    let left, a;
    left = Number(c.clientX - line.left).toFixed(2);
    a = left < 0 ? 0 : left;
    a = a > line.w ? line.w : a;

    // debugger;
    let h = Math.abs(Math.round(a / (line.w / 360)) - 360);
    this.props.add_color([h, null, null]);
  }

  hookCPos() {
    // const { left } = this.state;
    // const { line } = this;
    // let h = Math.abs(Math.round(left / (line.w / 360)) - 360);
    // h = h == 360 ? 0 : h;
    // this.props.add_color([h, null, null]);
  }

  getStyle(): { left: string } {
    let left;

    const { line } = this;
    left = 0;

    const { H } = this.props;
    left = Math.abs((H - 360) * (line.w / 360));

    left = left < 0 ? 0 : left;
    left = left > line.w ? line.w : left;

    const style = {
      left: left + "px"
    };
    return style;
  }

  render() {
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
