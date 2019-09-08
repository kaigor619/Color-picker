import React from "react";
import PresentColorTheme, { StateProps } from "./PresentColor";
import * as Redux from "redux";
import { connect } from "react-redux";
import { ThemeStore } from "../../interfaces";
import * as Action from "../../actions";
import convert from "../../options/convert";

interface ObjProps {
  opacity: number;
  rgb_val: number[];
}

class PresentColorOut extends PresentColorTheme {
  handleClick() {
    this.props.add_color(this.props.rgb_val);
  }

  name = "out_color";

  getPresentStyle() {
    const backgroundColor = convert.rgb_string(this.props.rgb_val);
    const opacity = this.props.opacity;
    return {
      backgroundColor,
      opacity
    };
  }
}

const mapStateToProps = ({
  rgb_val,
  opacity,
  prevColor
}: ThemeStore): StateProps => {
  return {
    rgb_val,
    opacity,
    prevColor
  };
};

const mapDispatchToProps = {
  add_color: Action.change_rgb
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentColorOut);
