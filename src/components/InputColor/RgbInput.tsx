import React, { Component } from "react";
import { connect } from "react-redux";
import InputCell from "./InputCell";
import * as Action from "../../actions";

interface StateProps {
  model: number[];
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

  type = "rgb";

  handleChange(text: string, index: number) {
    let modelCopy = this.props.model.slice();
    if (index <= 2) {
      modelCopy[index] = +text;
      this.props.changeModel(modelCopy);
    } else {
      this.props.changeOpacity(+text);
    }
  }

  render() {
    const { opacity, model, type } = this.props;

    if (this.type !== type) return null;
    let masAllData = model.slice();
    masAllData.push(opacity);

    let inputs = masAllData.map((item, index) => {
      let value = String(item);
      return (
        <InputCell
          value={value}
          key={index}
          index={index}
          maxLength={4}
          handleChange={this.handleChange}
        />
      );
    });
    return (
      <li className="type_val_color active">
        <div className="wrap_color_input">{inputs}</div>
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
