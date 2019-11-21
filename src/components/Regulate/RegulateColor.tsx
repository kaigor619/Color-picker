import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';

import './styles.css';

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
    this.touchMove = this.touchMove.bind(this);
  }
  regulateLine: any = React.createRef();

  line = {
    w: 0,
    h: 0,
    left: 0,
    x: 0,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.H !== this.props.H || this.line.w !== 0) return true;
    else return false;
  }

  componentDidMount() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.left = elem.getBoundingClientRect().left;

    this.setState({});

    // Events
    elem.onmousedown = e => {
      this.cPos(e, true);
      document.onmousemove = e => this.cPos(e, true);

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };

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
    document.onmousemove = e => this.cPos(e, true);

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }

  cPos(c: any, bool: boolean) {
    if (bool) c.preventDefault();
    const { line } = this;
    let left, a;
    left = Number(c.clientX - line.left).toFixed(2);
    a = left < 0 ? 0 : left;
    a = a > line.w ? line.w : a;
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
      left: left + 'px',
    };
    return style;
  }

  render() {
    const style = this.getStyle();
    return (
      <div className="cp_w-reg">
        <div className="cp_reg-line color" ref={this.regulateLine}></div>
        <div
          onMouseDown={this.handleDown}
          onTouchStart={this.touchMove}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchMove}
          style={style}
          draggable={false}
          className="cp_reg-circle"
        ></div>
      </div>
    );
  }
}

const mapStateToProps = ({ H }) => {
  return {
    H,
  };
};
const mapDispatchToProps = {
  add_color: Action.eventHSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegulateColor);
