import React, { useState, Component } from "react";

interface ItestInputCell {
  value: string;
  hex?: boolean;
  maxLength: number;
  handleChange: (text: string, i: number) => void;
  index: number;
}

type Props = ItestInputCell;

class InputCell extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
  }
  state = {
    value: ""
  };
  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({ value });
    }
  }

  inputChange(e) {
    const { hex, index } = this.props;
    let text: string = e.target.value;
    let { value } = this.state;
    if (!hex) text = text.replace(/[^.0-9]/gim, "");
    if (text !== value) {
      this.setState({ value: text });
      this.props.handleChange(text, index);
    }
  }

  render() {
    let { maxLength, hex } = this.props;
    let classNames = "input_text_value";
    if (hex) classNames = "hex_text_value";
    return (
      <input
        type="text"
        maxLength={maxLength}
        value={this.state.value}
        onChange={this.inputChange}
        className={classNames}
      />
    );
  }
}

export default InputCell;
