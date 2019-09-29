import React, { Component } from "react";
import { PresentCell, PresentColorDiv } from "./styles";

export interface StateProps {
  rgbMain: number[];
  prevColor: { rgbMain: number[]; opacity: number };
  opacity: number;
}

interface DispatchProps {
  add_color: (mas: any) => void;
}

type Props = StateProps & DispatchProps;

class PresentColorTheme extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  name: string = "";

  handleClick() {}
  getPresentStyle() {
    return {
      backgroundColor: "red",
      opacity: 1
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

export default PresentColorTheme;
