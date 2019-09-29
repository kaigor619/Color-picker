import React, { Component } from "react";
import PresentColorTheme from "./PresentColor";
import * as Redux from "redux";
import { connect } from "react-redux";
import { ThemeStore } from "../../interfaces";
import * as Action from "../../actions";
import Model from "../../options/modelsColor";
import { PresentCell, PresentColorDiv } from "./styles";

interface StateProps {
  prevColor: { rgbMain: number[]; opacity: number };
}

interface DispatchProps {
  add_color: (mas: any) => void;
}

type Props = StateProps & DispatchProps;

class PresentColorLast extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

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
  render() {
    const { name } = this;
    const style = this.getPresentStyle();
    return (
      <PresentCell className="color_cell">
        <PresentColorDiv
          className={"present_color " + name}
          onClick={this.handleClick}
          style={style}
        ></PresentColorDiv>
      </PresentCell>
    );
  }
}

const mapStateToProps = ({ prevColor }: ThemeStore): StateProps => {
  return {
    prevColor
  };
};

const mapDispatchToProps = {
  add_color: (mas: number[]) => {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentColorLast);
