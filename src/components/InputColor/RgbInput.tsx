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
  type = "rgb";
  uniqueId = -1;

  render() {
    const { model, opacity, type } = this.props;

    if (type !== this.type) return null;

    let inputs = model.map(item => {
      this.uniqueId++;
      return (
        <InputCell maxLength={3} key={this.uniqueId} index={this.uniqueId} />
      );
    });

    this.uniqueId++;
    return (
      <li className="type_val_color active">
        <div className="wrap_color_input">
          {this.uniqueId}
          {/* {inputs} */}
          {/* <InputCell
            maxLength={4}
            key={this.uniqueId}
            index={this.uniqueId}
            alpha={true}
          /> */}
        </div>
      </li>
    );
  }
}

const mapStateToProps = ({ models, opacity, type }: any): StateProps => {
  return {
    model: models[type],
    opacity,
    type
  };
};

const mapDispatchToProps: DispatchProps = {};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RgbInput);
