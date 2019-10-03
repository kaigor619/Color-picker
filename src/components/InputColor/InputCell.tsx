import React, { useState, Component } from "react";
import { InputColor, HexInput } from "./styles";
import { connect } from "react-redux";
import * as Action from "../../actions";

interface StateProps {
  model: number[] | string[];
  opacity: number;
  type: string;
}
interface DispatchProps {
  changeModel: (val: string | number, index: number) => void;
  changeOpacity: (opacity: number) => void;
}

interface IInputCell {
  maxLength: number;
  index: number;
  opacityBool?: boolean;
  hexBool?: boolean;
}

type Props = StateProps & DispatchProps & IInputCell;

class InputCell extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
  }
  label = "";
  componentWillMount() {
    const { opacityBool, hexBool, opacity, model, index } = this.props;
    let value;
    if (opacityBool) {
      value = String(opacity);
    } else if (hexBool) value = model;
    else if (!hexBool) value = model[index];

    this.label = value;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { opacityBool, hexBool, opacity, model, index } = this.props;
    if (opacityBool) {
      if (nextProps.opacity !== opacity) {
        this.label = String(nextProps.opacity);
        return true;
      }
    } else if (!hexBool) {
      if (nextProps.model[index] !== model[index]) {
        this.label = String(nextProps.model[index]);
        // console.log("should" + nextProps.model[index]);
        return true;
      }
    } else if (hexBool) {
      if (nextProps.model !== model) {
        this.label = String(nextProps.model);
        return true;
      }
    }

    return false;
  }
  // componentWillUpdate(prevProps) {
  //   const { opacityBool, hexBool, opacity, model, index } = this.props;
  //   if (opacityBool) {
  //     if (prevProps.opacity !== opacity) this.label = String(opacity);
  //   } else if (!hexBool) {
  //     if (prevProps.model[index] !== model[index])
  //       this.label = String(model[index]);
  //   } else if (hexBool) {
  //     if (prevProps.model !== model) this.label = String(model);
  //   }
  //   console.log(this.label);
  // }

  inputChange(e) {
    const { hexBool, index, model, opacityBool } = this.props;
    let value;
    if (hexBool) value = model;
    else value = model[index];
    let text: string = e.target.value;
    if (!hexBool) {
      text = text.replace(/[^\d.-]/g, "");
    }
    this.label = text;
    console.log(this.label);
    // if (text.indexOf(".") > -1) {
    //   text += "5";
    //   console.log(text);
    // }
    if (text !== value) {
      if (opacityBool) {
        this.props.changeOpacity(+text);
      } else {
        // this.props.changeModel(text, index);
      }
    }
    // }
  }

  render() {
    console.log("render " + this.label);
    let { label } = this;
    let { maxLength, model, index, opacityBool, hexBool } = this.props;
    let value;
    if (opacityBool) {
      value = this.props.opacity;
    } else if (hexBool) {
      value = label;
    } else value = label;

    let options = {
      type: "text",
      maxLength: maxLength,
      value: String(value),
      onChange: this.inputChange,
      hex: hexBool
    };

    let component = <InputColor {...options} />;
    return component;
  }
}

const mapStateToProps = ({ type, models, opacity }: any): StateProps => {
  return {
    type,
    model: models[type],
    opacity
  };
};

const mapDispatchToProps: DispatchProps = {
  changeModel: Action.compo_change_model_for_index,
  changeOpacity: Action.change_opacity
};

// changeOpacity: (opacity: number) => {
//   dispatch(Action.change_opacity(opacity));
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputCell);
