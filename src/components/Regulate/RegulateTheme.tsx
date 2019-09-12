import React, { Component } from "react";
import convert from "../../options/convert";
import * as Action from "../../actions";

export interface StateProps {
  H: number;
  opacity: number;
}

export interface DispatchProps {
  add_color: (n: number) => void;
  add_opacity: (n: number) => void;
}

export const mapStateToProps = ({ H, opacity }: any) => {
  return {
    H,
    opacity
  };
};
export const mapDispatchToProps = (dispatch: any) => {
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

export type Props = StateProps & DispatchProps;

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
    left: 0,
    x: 0
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

    this.setState({ left: line.w });

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

    this.hookCPos();
  }
}

export default RegulateTheme;
