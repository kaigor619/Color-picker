import React from 'react';
import PresentColorTheme from './PresentColor';
import { connect } from 'react-redux';
import { ThemeStore } from '../../interfaces';
import Model from '../../options/modelsColor';
import './styles.css';

interface StateProps {
  rgbMain: number[];
  opacity: number;
}

type Props = StateProps;

class PresentColorOut extends PresentColorTheme<Props> {
  getPresentStyle() {
    let { opacity, rgbMain } = this.props;
    const backgroundColor = Model.rgb.getString(rgbMain, opacity);
    return {
      backgroundColor,
    };
  }
}

const mapStateToProps = ({ rgbMain, opacity }: ThemeStore) => {
  return {
    rgbMain,
    opacity,
  };
};

export default connect(
  mapStateToProps,
  {},
)(PresentColorOut);
