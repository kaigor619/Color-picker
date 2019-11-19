import React, { Component } from 'react';
import Swatch from './Swatch';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import { Icolors, IDescription } from '../../interfaces';
import DescriptionColor from '../DescriptionColor';
import './styles.css';
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
        <div className="cp_custom-colors">
          {swatches}
          <div
            onClick={() => this.props.swatchAdd()}
            className="cp_add-color"
            id="cp_add-color"
          >
            <img src="./svg/plus-symbol.svg" alt="" />
          </div>
        </div>
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
