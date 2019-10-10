import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import {
  WrapLineRegulate,
  StyleRegulateOpacity,
  RegulateCircle,
  LinearOpacity,
} from './styles';

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
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
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
    elem.onclick = this.cPos;
    elem.onmousedown = () => {
      document.onmousemove = this.cPos;

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };

    elem.addEventListener('touchstart', this.touchStart, false);
    elem.addEventListener('touchend', this.touchEnd, false);
    elem.addEventListener('touchmove', this.touchMove, false);
  }

  touchStart(e: any) {
    this.touchMove(e);
  }
  touchEnd(e: any) {
    this.touchMove(e);
  }

  touchMove(e: any) {
    e.preventDefault();
    var touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const newEvent = {
        clientX: touches[i].pageX,
        clientY: touches[i].pageY,
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
    c.preventDefault();
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
      <WrapLineRegulate>
        <StyleRegulateOpacity ref={this.regulateLine}>
          <LinearOpacity></LinearOpacity>
        </StyleRegulateOpacity>
        <RegulateCircle
          onMouseDown={this.handleDown}
          onClick={this.cPos}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          style={this.getStyle()}
          draggable={false}
        ></RegulateCircle>
      </WrapLineRegulate>
    );
  }
}

const mapStateToProps = ({ opacity }: any) => {
  return {
    opacity,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    add_opacity: (opacity: number) => {
      dispatch(Action.compo_change_opacity(opacity));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegulateOpacity);
