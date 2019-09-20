import React from "react";
import PresentColorTheme, { StateProps } from "./PresentColor";
import * as Redux from "redux";
import { connect } from "react-redux";
import { ThemeStore } from "../../interfaces";
import * as Action from "../../actions";
import Model from "../../options/modelsColor";

class PresentColorOut extends PresentColorTheme {
  handleClick() {
    this.props.add_color(this.props.rgbMain);
  }

  name = "out_color";

  getPresentStyle() {
    const backgroundColor = Model.rgb.getStr(this.props.rgbMain);
    const opacity = this.props.opacity;
    return {
      backgroundColor,
      opacity
    };
  }
}

const mapStateToProps = ({
  rgbMain,
  opacity,
  prevColor
}: ThemeStore): StateProps => {
  return {
    rgbMain,
    opacity,
    prevColor
  };
};

const mapDispatchToProps = {
  // add_color: Action.change_rgb
  add_color: (mas: number[]) => {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentColorOut);
