import React from "react";
import PresentColorTheme, { StateProps } from "./PresentColor";
import * as Redux from "redux";
import { connect } from "react-redux";
import { ThemeStore } from "../../interfaces";
import * as Action from "../../actions";
import Model from "../../options/modelsColor";

class PresentColorLast extends PresentColorTheme {
  handleClick() {
    this.props.add_color(this.props.prevColor.rgbMain);
  }
  name = "last_color";

  getPresentStyle() {
    let { rgbMain, opacity } = this.props.prevColor;
    const backgroundColor = Model.rgb.getStr(rgbMain);
    return {
      backgroundColor,
      opacity
    };
  }
}

const mapStateToProps = ({
  prevColor,
  opacity,
  rgbMain
}: ThemeStore): StateProps => {
  return {
    prevColor,
    opacity,
    rgbMain
  };
};

const mapDispatchToProps = {
  // add_color: Action.change_rgb
  add_color: (mas: number[]) => {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentColorLast);
