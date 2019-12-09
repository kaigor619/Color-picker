import React, { Component } from 'react';

type Props = {};

class PresentColorTheme<TProps = Props> extends Component<TProps> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  stylePresent = {};

  handleClick() {}
  stylingPresent() {}

  render() {
    this.stylingPresent();
    return (
      <div className="cp_present-cell">
        <div
          className="cp_present-color"
          onClick={this.handleClick}
          style={this.stylePresent}
        ></div>
      </div>
    );
  }
}

export default PresentColorTheme;
