import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import RegulateTheme from './RegulateTheme';
import './styles.css';

export interface StateProps {
  H: number;
}

export interface DispatchProps {
  add_color: (hsv: any) => void;
}

type Props = StateProps & DispatchProps;

class RegulateColor extends RegulateTheme<Props> {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.H !== this.props.H || this.line.w !== 0) return true;
    else return false;
  }

  hookCPos(a: number) {
    const { line } = this;
    let h = Math.abs(Math.round(a / (line.w / 360)) - 360);
    this.props.add_color([h, null, null]);
  }

  getLeft() {
    const {
      line,
      props: { H },
    } = this;
    let left = Math.abs((H - 360) * (line.w / 360));
    return left;
  }

  render() {
    this.stylingCircle();
    return (
      <div className="cp_w-reg">
        <div className="cp_reg-line color" ref={this.regulateLine}></div>
        <div
          onMouseDown={this.handleDown}
          onTouchStart={this.touchMove}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchMove}
          style={this.styleCircle}
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
