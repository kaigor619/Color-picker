import React from 'react';
import { connect } from 'react-redux';
import PresentColorTheme from './PresentColor';
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

class PresentColorLast extends PresentColorTheme<Props> {
  handleClick() {
    this.props.add_color();
  }

  getPresentStyle() {
    const backgroundColor = this.props.prevColor;
    return {
      backgroundColor,
    };
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
