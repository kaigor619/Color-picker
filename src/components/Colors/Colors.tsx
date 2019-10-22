import React, { Component } from 'react';
import Swatch from './Swatch';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import { Icolors, IDescription } from '../../interfaces';
import DescriptionColor from '../DescriptionColor';
import { StyleCustomColors, StyleAddColor } from './styles';
interface StateProps {
  colors: Icolors[];
  description: IDescription;
}

interface DispatchProps {
  swatchClick: (index: number) => void;
  swatchAdd: () => void;
}

type Props = StateProps & DispatchProps;

class Colors extends Component<Props> {
  render() {
    const { colors } = this.props;
    let swatches = colors.map(({ name, color }, index) => {
      return (
        <Swatch
          key={name}
          color={color}
          index={index}
          name={name}
          handleClick={() => this.props.swatchClick(index)}
        />
      );
    });

    let DescriptionComponent;
    if (this.props.description.enable) {
      DescriptionComponent = <DescriptionColor />;
    }

    return (
      <React.Fragment>
        <StyleCustomColors className="custom-colors">
          {swatches}
          <StyleAddColor
            onClick={() => this.props.swatchAdd()}
            className="add_new_color"
            id="add_new_color"
          >
            <img src="./svg/plus-symbol.svg" alt="" />
          </StyleAddColor>
        </StyleCustomColors>
        {DescriptionComponent}
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ colors, description }): StateProps => {
  return {
    colors,
    description,
  };
};

const mapDispatchToProps = {
  swatchClick: Action.eventClickSwatch,
  swatchAdd: Action.eventClickAddSwatch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Colors);
