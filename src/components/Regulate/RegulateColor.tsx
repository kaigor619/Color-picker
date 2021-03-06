import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import RegulateTheme from './RegulateTheme';
import './styles.css';

export interface StateProps {
  H: number;
  width: number;
}

export interface DispatchProps {
  add_color: (hsv: any) => void;
}

type Props = StateProps & DispatchProps;

export class RegulateColor extends RegulateTheme<Props> {
  diff = 360;

  componentDidUpdate(prevProps) {
    if (this.props.width !== prevProps.width) {
      this.updateElem();
      this.forceUpdate();
    }
  }

  hookCPos(a: number) {
    const { line } = this;
    const h = Math.abs(Math.round(a / line.x) - 360);
    this.props.add_color([h, null, null]);
  }

  getLeft() {
    const {
      line,
      props: { H },
    } = this;
    const left = Math.abs((H - 360) * line.x);
    return left;
  }

  events = {
    onMouseDown: this.mouseDown,
    onTouchStart: this.touchStart,
    onTouchMove: this.touchMove,
    onTouchEnd: this.touchMove,
  };

  render() {
    this.stylingCircle();
    return (
      <div className="cp_w-reg">
        <div
          className="cp_reg-line color"
          ref={this.regulateLine}
          {...this.events}
        ></div>
        <div
          {...this.events}
          style={this.styleCircle}
          draggable={false}
          className="cp_reg-circle"
          id="cp_reg-circle"
        ></div>
      </div>
    );
  }
}

const mapStateToProps = ({ H, options }) => {
  return {
    H,
    width: options.picker.width,
  };
};
const mapDispatchToProps = {
  add_color: Action.eventHSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegulateColor);
