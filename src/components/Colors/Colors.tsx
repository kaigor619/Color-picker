import React, { Component } from "react";
import Swatch from "./Swatch";
import { IuserColors } from "../../interfaces";
import { connect } from "react-redux";
import Model from "../../options/modelsColor";
import * as Action from "../../actions";

interface StateProps {
  userColors: IuserColors;
  model: number[] | any;
  type: string;
  opacity: number;
}

interface DispatchProps {
  change_type_index: (edit: boolean) => void;
  change_colors: (colors: { name: string; color: string }[]) => void;
}

type Props = StateProps & DispatchProps;

class Colors extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleAddSwatch = this.handleAddSwatch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  counter = 1;
  labelCounter = "Color";

  handleAddSwatch(e) {
    const { change_colors, model, type, opacity } = this.props;
    let color = Model[type].getString(model, opacity);
    this.counter += 1;
    let name = `${this.labelCounter} ${this.counter}`;
    const colors = this.props.userColors.colors.slice();
    colors.push({ name, color });
    this.props.change_colors(colors);
  }
  handleClick(index: number) {
    this.props.change_type_index(true);
  }
  componentDidMount() {
    const { colors } = this.props.userColors;
    this.counter = colors.length;
  }
  render() {
    const { colors } = this.props.userColors;
    let swatches = colors.map(({ name, color }, index) => {
      return (
        <Swatch
          key={name}
          color={color}
          index={index}
          name={name}
          handleClick={this.handleClick}
        />
      );
    });
    return (
      <div className="custom_colors">
        {swatches}

        <div
          onClick={this.handleAddSwatch}
          className="add_new_color"
          id="add_new_color"
        >
          <img src="./svg/plus-symbol.svg" alt="" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ userColors, models, type, opacity }): StateProps => {
  return {
    userColors,
    model: models[type],
    type,
    opacity
  };
};

const mapDispatchToProps: DispatchProps = {
  change_type_index: Action.change_users_colors_edit,
  change_colors: Action.change_users_colors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Colors);
