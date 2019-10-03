import React, { Component } from "react";
import { connect } from "react-redux";
import { WrapColorInputs } from "./styles";
import { InitialState } from "../../reducers";
import InputCell from "./InputCell";

interface StateProps {
  type: string;
}
type Props = StateProps;

class HslInput extends Component<Props> {
  type = "hsl";

  render() {
    const { type } = this.props;
    const { hsl } = InitialState.models;

    if (this.type !== type) return null;
    let inputs = hsl.map((item, index) => {
      return <InputCell key={index} index={index} maxLength={4} />;
    });
    let inputOpacity = (
      <InputCell
        key={hsl.length}
        index={hsl.length}
        maxLength={4}
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

export default connect(mapStateToProps)(HslInput);
