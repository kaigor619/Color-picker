import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../actions";
import {
  WrapLineRegulate,
  StyleRegulateOpacity,
  RegulateCircle,
  LinearOpacity
} from "./styles";

import RegulateTheme, { StateProps, DispatchProps } from "./RegulateTheme";

class RegulateOpacity extends RegulateTheme {
  state = {
    left: 0
  };
  hookDidMount() {
    const { line } = this;
    line.x = line.w / 100;
  }

  hookCPos() {
    const { left } = this.state;
    const { line } = this;
    let opacity: number = +(Math.floor(left / line.x) * 0.01).toFixed(2);
    this.props.add_opacity(opacity);
  }
  getStyle(): { left: string } {
    let left: number = 0;
    const { lineMove, line } = this;
    const { opacity } = this.props;
    // debugger;
    if (lineMove) {
      left = this.state.left;
    } else {
      left = (opacity * line.x) / 0.01;
    }

    const style = {
      left: left + "px"
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
          {...this.getStyle()}
        ></RegulateCircle>
      </WrapLineRegulate>
    );
  }
}

const mapStateToProps = ({ H, opacity }: any) => {
  return {
    H,
    opacity
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    add_color: (mas: any) => {
      dispatch(Action.compo_change_HSV(mas));
    },
    add_opacity: (opacity: number) => {
      dispatch(Action.compo_change_opacity(opacity));
    }
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegulateOpacity);
