import React, { Component } from "react";

export interface StateProps {
  rgb_val: number[];
  prevColor: { rgb_val: number[]; opacity: number };
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
    return (
      <div className="color_cell">
        <div
          id={name}
          className={"present_color " + name}
          onClick={this.handleClick}
          style={this.getPresentStyle()}
        ></div>
      </div>
    );
  }
}

export default PresentColorTheme;
