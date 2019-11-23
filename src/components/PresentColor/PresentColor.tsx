import React, { Component } from 'react';

type Props = {};

class PresentColorTheme<TProps = Props> extends Component<TProps> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {}
  getPresentStyle(): { backgroundColor: string } {
    return {
      backgroundColor: 'red',
    };
  }

  render() {
    const style = this.getPresentStyle();
    return (
      <div className="cp_present-cell">
        <div
          className="cp_present-color"
          onClick={this.handleClick}
          style={style}
        ></div>
      </div>
    );
  }
}

export default PresentColorTheme;
