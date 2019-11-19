import React, { Component } from 'react';
import PresentColorTheme from './PresentColor';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { ThemeStore } from '../../interfaces';
import * as Action from '../../actions';
import Model from '../../options/modelsColor';
import './styles.css';

interface StateProps {
  rgbMain: number[];
  opacity: number;
}

interface DispatchProps {
  add_color: (mas: any) => void;
}

type Props = StateProps & DispatchProps;

class PresentColorOut extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.add_color(this.props.rgbMain);
  }

  name = 'out_color';

  getPresentStyle() {
    let { opacity, rgbMain } = this.props;
    const backgroundColor = Model.rgb.getString(rgbMain, opacity);
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

const mapStateToProps = ({ rgbMain, opacity }: ThemeStore) => {
  return {
    rgbMain,
    opacity,
  };
};

const mapDispatchToProps = {
  add_color: (mas: number[]) => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PresentColorOut);
