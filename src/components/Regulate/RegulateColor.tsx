import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../actions";
import RegulateTheme, { StateProps, DispatchProps } from "./RegulateTheme";
import { WrapLineRegulate, StyleRegulateColor, RegulateCircle } from "./styles";

class RegulateColor extends RegulateTheme {
  state = {
    left: 0
  };

  hookCPos() {
    const { left } = this.state;
    const { line } = this;

    let h = Math.abs(Math.round(left / (line.w / 360)) - 360);
    h = h == 360 ? 0 : h;

    this.props.add_color([h, null, null]);
  }

  getStyle(): { left: string } {
    let left;

    const { lineMove, line } = this;
    if (lineMove) {
      left = this.state.left;
    } else {
      left = 10;

      const { H } = this.props;
      left = Math.abs((H - 360) * (line.w / 360));
    }
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
      dispatch(Action.change_opacity(opacity));
    }
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegulateColor);
