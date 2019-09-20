import React, { Component } from "react";
import { connect } from "react-redux";
import InputCell from "./InputCell";
import * as Action from "../../actions";

interface StateProps {
  model: string;
  type: string;
  opacity: number;
}
interface DispatchProps {
  changeModel: (val: string | number[]) => void;
  changeOpacity: (opacity: number) => void;
}

type Props = StateProps & DispatchProps;

class RgbInput extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  type = "hex";

  handleChange(text: string, index: number) {
    this.props.changeModel(text);

    let opacity;
    if (9 === text.length) {
      opacity = text.substring(7, 9);
    }
    if ("undefined" === typeof opacity) {
      opacity = "ff";
    }
    opacity = +parseInt(opacity, 16) / 255;
    this.props.changeOpacity(opacity);
  }

  render() {
    const { opacity, model, type } = this.props;

    if (this.type !== type) return null;

    let input = (
      <InputCell
        hex={true}
        index={0}
        value={model}
        maxLength={9}
        handleChange={this.handleChange}
      />
    );

    return (
      <li className="type_val_color active">
        <div className="wrap_color_input">{input}</div>
      </li>
    );
  }
}

const mapStateToProps = ({ opacity, type, models }: any): StateProps => {
  return {
    opacity,
    type,
    model: models[type]
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    changeModel: (val: string | number[]) => {
      dispatch(Action.compo_change_model(val));
    },
    changeOpacity: (opacity: number) => {
      dispatch(Action.change_opacity(opacity));
    }
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RgbInput);
