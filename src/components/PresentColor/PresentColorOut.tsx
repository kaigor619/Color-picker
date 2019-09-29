import React, { Component } from "react";
import PresentColorTheme from "./PresentColor";
import * as Redux from "redux";
import { connect } from "react-redux";
import { ThemeStore } from "../../interfaces";
import * as Action from "../../actions";
import Model from "../../options/modelsColor";
import { PresentCell, PresentColorDiv } from "./styles";

interface StateProps {
  rgbMain: number[];
  opacity: number;
}

interface DispatchProps {
  add_color: (mas: any) => void;
}

type Props = StateProps & DispatchProps;

class PresentColorOut extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

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
  render() {
    const { name } = this;
    const style = this.getPresentStyle();
    return (
      <PresentCell className="color_cell">
        <PresentColorDiv
          onClick={this.handleClick}
          style={style}
        ></PresentColorDiv>
      </PresentCell>
    );
  }
}

const mapStateToProps = ({ rgbMain, opacity }: ThemeStore): StateProps => {
  return {
    rgbMain,
    opacity
  };
};

const mapDispatchToProps = {
  add_color: (mas: number[]) => {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentColorOut);
