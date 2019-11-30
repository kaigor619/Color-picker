import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import RegulateTheme from './RegulateTheme';
import { IOptions } from '../../interfaces';
import './styles.css';

export interface StateProps {
  H: number;
  width: number;
  resize: boolean;
}

export interface DispatchProps {
  add_color: (hsv: any) => void;
}

type Props = StateProps & DispatchProps;

class RegulateColor extends RegulateTheme<Props> {
  diff = 360;
  shouldComponentUpdate(nextProps, nextState) {
    let bool = false;
    if (nextProps.H !== this.props.H || this.line.w !== 0) bool = true;

    if (this.props.resize !== nextProps.resize) {
      this.updateCoords();
      bool = true;
    }
    if (this.props.width !== nextProps.width) {
      setTimeout(() => {
        this.updateElem();
      }, 1);
      bool = true;
    }

    return bool;
  }

  hookCPos(a: number) {
    const { line } = this;
    let h = Math.abs(Math.round(a / line.x) - 360);
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

const mapStateToProps = ({ H, options, resize }) => {
  return {
    H,
    width: options.picker.width,
    resize,
  };
};
const mapDispatchToProps = {
  add_color: Action.eventHSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegulateColor);
