import React from "react";
import PresentColorTheme, { StateProps } from "./PresentColor";
import * as Redux from "redux";
import { connect } from "react-redux";
import { ThemeStore } from "../../interfaces";
import * as Action from "../../actions";
import convert from "../../options/convert";

class PresentColorLast extends PresentColorTheme {
  handleClick() {
    this.props.add_color(this.props.prevColor.rgb_val);
  }
  name = "last_color";

  getPresentStyle() {
    let { rgb_val, opacity } = this.props.prevColor;
    const backgroundColor = convert.rgb_string(rgb_val);
    return {
      backgroundColor,
      opacity
    };
  }
}

const mapStateToProps = ({
  prevColor,
  opacity,
  rgb_val
}: ThemeStore): StateProps => {
  return {
    prevColor,
    opacity,
    rgb_val
  };
};

const mapDispatchToProps = {
  add_color: Action.change_rgb
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentColorLast);
