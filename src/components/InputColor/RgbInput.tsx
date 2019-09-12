import React, { Component } from "react";
import { connect } from "react-redux";
import InputCell from "./InputCell";

interface StateProps {
  model: number[];
  type: string;
  opacity: number;
}
interface DispatchProps {}

type Props = StateProps & DispatchProps;

class RgbInput extends Component<Props> {
  componentDidMount() {
    const { opacity } = this.props;
    this.setState({ opacity });
  }

  render() {
    const { opacity, model } = this.props;
    let masAllData = model.slice();
    masAllData.push(opacity);

    let inputs = masAllData.map((item, index) => {
      return (
        <InputCell
          value={item}
          key={index}
          maxLength={4}
          handleChange={() => {}}
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

export default connect(
  mapStateToProps,
  {}
)(RgbInput);
