import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../actions";
import convert from "../../options/convert";

interface IOwnProps {
  maxLength: number;
  hex?: boolean;
  index: number;
  alpha?: boolean;
}

interface StateProps {
  value: number[];
  opacity: number;
}
interface DispatchProps {
  changeModelColor: (mas: number[]) => void;
  changeOpacity: (opacity: number) => void;
}

type Props = StateProps & DispatchProps & IOwnProps;

class InputCell extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    label: this.props.opacity
  };

  //   componentDidUpdate(prevProps) {
  //     if (this.props.opacity !== prevProps.opacity) {
  //       this.setState({ label: this.props.opacity });
  //     }
  //   }

  componentDidMount() {
    // const { index, value, alpha, opacity } = this.props;

    // let label: number = 0;
    // if (alpha) {
    //   label = opacity;
    // } else label = value[index];

    // this.setState({ label });
    console.log("didmount");
  }

  handleChange(e) {
    // let label = e.target.value;
    // label = label.replace(/[^.0-9]/gim, "");
    // if (this.state.label !== label) {
    //   this.setState({ label });
    //   label = +label;
    //   const { value, index, alpha } = this.props;
    //   if (alpha) {
    //     this.props.changeOpacity(label);
    //   } else {
    //     let val = value.slice();
    //     val[index] = label;
    //     this.props.changeModelColor(val);
    //   }
    // }
  }
  render() {
    const { maxLength, hex } = this.props;
    const { label } = this.state;
    let classNames = "input_text_value";
    if (hex) classNames = "hex_text_value";
    return (
      <input
        type="text"
        maxLength={maxLength}
        value={label}
        onChange={this.handleChange}
        className={classNames}
      />
    );
  }
}
const mapStateToProps = ({ models, type, opacity }: any): StateProps => {
  return {
    value: models[type],
    opacity
  };
};

const mapDispatchToProps: DispatchProps = {
  changeModelColor: Action.change_model_val,
  changeOpacity: Action.change_opacity
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(InputCell);
