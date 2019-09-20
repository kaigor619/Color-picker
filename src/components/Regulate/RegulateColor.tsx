import React, { Component } from "react";
import Convert from "../../options/convert";
import { connect } from "react-redux";
import * as Action from "../../actions";
import RegulateTheme, { StateProps, DispatchProps } from "./RegulateTheme";

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

  getStyle(): { left: number } {
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
      left
    };
    return style;
  }

  render() {
    return (
      <div className="wrap_line_color line">
        <div
          id="ss_line"
          className="hue_color line_color"
          ref={this.regulateLine}
        ></div>
        <div
          className="picker_slider"
          id="line_circle"
          onMouseDown={this.handleDown}
          onClick={this.cPos}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          style={this.getStyle()}
        ></div>
      </div>
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
