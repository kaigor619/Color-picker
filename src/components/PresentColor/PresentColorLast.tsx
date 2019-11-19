import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemeStore } from '../../interfaces';
import * as Action from '../../actions';
import './styles.css';

interface StateProps {
  prevColor: string;
}

interface DispatchProps {
  add_color: () => void;
}

type Props = StateProps & DispatchProps;

class PresentColorLast extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.add_color();
  }
  name = 'last_color';

  getPresentStyle() {
    // let { rgbMain, opacity } = this.props.prevColor;
    const backgroundColor = this.props.prevColor;
    return {
      backgroundColor,
    };
  }
  render() {
    const { name } = this;
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

const mapStateToProps = ({ prevColor }: ThemeStore): StateProps => {
  return {
    prevColor,
  };
};

const mapDispatchToProps = {
  add_color: Action.eventClickPrevColor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PresentColorLast);
