import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';

export interface StateProps {
  opacity: number;
}

export interface DispatchProps {
  add_opacity: (n: number) => void;
}

type Props = StateProps & DispatchProps;

class RegulateOpacity extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.cPos = this.cPos.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  regulateLine: any = React.createRef();

  line = {
    w: 0,
    h: 0,
    left: 0,
    x: 0,
  };

  componentDidMount() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.left = elem.getBoundingClientRect().left;
    this.setState({});

    this.hookDidMount();

    // Events
    elem.onmousedown = () => {
      document.onmousemove = e => this.cPos(e, true);

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };

    // const resize = window.onresize;
    // window.onresize = e => {
    //   // if (window.onresize && typeof window.onresize == 'function') {
    //   //   line.left = elem.getBoundingClientRect().left;
    //   //   this.setState({});
    //   // }
    //   console.log(window.onresize);
    // };

    elem.addEventListener('touchstart', this.touchMove, false);
    elem.addEventListener('touchend', this.touchMove, false);
    elem.addEventListener('touchmove', this.touchMove, false);
  }

  touchMove(e: any) {
    e.stopPropagation();
    var touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const newEvent = {
        clientX: touches[i].pageX,
        clientY: touches[i].pageY,
      };
      this.cPos(newEvent, false);
    }
  }

  handleDown(e: any) {
    document.onmousemove = () => this.cPos(e, true);

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }

  cPos(c: any, bool: boolean) {
    if (bool) c.preventDefault();
    const { line } = this;
    let left, a;
    left = c.clientX - line.left;
    a = left < 0 ? 0 : left;
    a = a > line.w ? line.w : a;

    let opacity: number = +(Math.floor(a / line.x) * 0.01).toFixed(2);
    this.props.add_opacity(opacity);

    // this.hookCPos();
  }

  hookDidMount() {
    const { line } = this;
    line.x = line.w / 100;
  }

  getStyle(): { left: string } {
    let left: number = 0;
    const { line } = this;
    const { opacity } = this.props;

    left = (opacity * line.x) / 0.01;

    left = left < 0 ? 0 : left;
    left = left > line.w ? line.w : left;

    const style = {
      left: left + 'px',
    };

    return style;
  }
  render() {
    return (
      <div className="cp_w-reg">
        <div className="cp_reg-line opacity" ref={this.regulateLine}>
          <div className="cp_reg-op-cover"></div>
        </div>

        <div
          onMouseDown={this.handleDown}
          onTouchStart={this.touchMove}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchMove}
          style={this.getStyle()}
          draggable={false}
          className="cp_reg-circle"
        ></div>
      </div>
    );
  }
}

const mapStateToProps = ({ opacity }: any) => {
  return {
    opacity,
  };
};

const mapDispatchToProps = {
  add_opacity: Action.eventOpacity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegulateOpacity);
