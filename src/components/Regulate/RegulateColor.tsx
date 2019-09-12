import React, { Component } from "react";
import convert from "../../options/convert";
import { connect } from "react-redux";
import * as Action from "../../actions";
import RegulateTheme, {
  StateProps,
  DispatchProps,
  mapStateToProps,
  mapDispatchToProps
} from "./RegulateTheme";

class RegulateColor extends RegulateTheme {
  hookCPos() {
    const { left } = this.state;
    const { line } = this;
    const h = convert.getHfromPosit(left, line.w);

    this.props.add_color(h);
  }

  getStyle(): { left: number } {
    let left;

    const { lineMove, line } = this;
    if (lineMove) {
      left = this.state.left;
    } else {
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

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegulateColor);
