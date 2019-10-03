import React, { Component } from "react";
import { connect } from "react-redux";
import { WrapColorInputs } from "./styles";
import { InitialState } from "../../reducers";
import InputCell from "./InputCell";

interface StateProps {
  type: string;
}
type Props = StateProps;

class RgbInput extends Component<Props> {
  type = "rgb";

  // handleChange(text: string, index: number) {
  //   let modelCopy = this.props.model.slice();
  //   if (index <= 2) {
  //     modelCopy[index] = +text;
  //     this.props.changeModel(modelCopy);
  //   } else {
  //     this.props.changeOpacity(+text);
  //   }
  // }

  render() {
    const { type } = this.props;
    const { rgb } = InitialState.models;

    if (this.type !== type) return null;
    let inputs = rgb.map((item, index) => {
      return <InputCell key={index} index={index} maxLength={4} />;
    });
    let inputOpacity = (
      <InputCell
        key={rgb.length}
        index={rgb.length}
        maxLength={9}
        opacityBool={true}
      />
    );
    return (
      <li>
        <WrapColorInputs>
          {inputs}
          {inputOpacity}
        </WrapColorInputs>
      </li>
    );
  }
}
const mapStateToProps = ({ type }) => ({ type });

export default connect(mapStateToProps)(RgbInput);
