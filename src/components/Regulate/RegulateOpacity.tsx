import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import RegulateTheme from './RegulateTheme';

export interface StateProps {
  opacity: number;
  width: number;
  resize: boolean;
}

export interface DispatchProps {
  add_opacity: (n: number) => void;
}

type Props = StateProps & DispatchProps;

class RegulateOpacity extends RegulateTheme<Props> {
  diff = 100;
  componentDidUpdate(prevProps) {
    if (this.props.width !== prevProps.width) {
      this.updateElem();
      this.forceUpdate();
    }
  }
  hookCPos(a: number) {
    const { line } = this;
    let opacity: number = +(Math.floor(a / line.x) * 0.01).toFixed(2);
    this.props.add_opacity(opacity);
  }

  getLeft() {
    const {
      line,
      props: { opacity },
    } = this;

    let left = (opacity * line.x) / 0.01;
    return left;
  }
  render() {
    this.stylingCircle();
    return (
      <div className="cp_w-reg">
        <div
          className="cp_reg-line opacity"
          ref={this.regulateLine}
          onMouseDown={this.mouseDown}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchMove}
        >
          <div className="cp_reg-op-cover"></div>
        </div>

        <div
          onMouseDown={this.mouseDown}
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

const mapStateToProps = ({ opacity, resize, options }: any) => {
  return {
    opacity,
    resize,

    width: options.picker.width,
  };
};

const mapDispatchToProps = {
  add_opacity: Action.eventOpacity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegulateOpacity);
