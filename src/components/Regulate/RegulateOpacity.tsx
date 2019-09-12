import React, { Component } from "react";
import convert from "../../options/convert";
import { connect } from "react-redux";
import RegulateTheme, {
  mapStateToProps,
  mapDispatchToProps,
  StateProps,
  DispatchProps
} from "./RegulateTheme";

class RegulateOpacity extends RegulateTheme {
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

  getLeft(): string {
    let { opacity } = this.props;
    let left = (opacity * this.line.x) / 0.01 + "px";
    return left;
  }
  getStyle(): { left: number } {
    let left: number = 0;
    const { lineMove, line } = this;
    const { opacity } = this.props;
    if (lineMove) {
      left = this.state.left;
    } else {
      left = (opacity * line.x) / 0.01;
    }
    const style = {
      left
    };
    return style;
  }
  render() {
    return (
      <div className="wrap_line_color opacity" ref={this.regulateLine}>
        <div className="opacity_color line_color" id="opacity_color">
          <div className="linear_cover"></div>
        </div>
        <div
          className="picker_slider"
          id="opacity_circle"
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
)(RegulateOpacity);
