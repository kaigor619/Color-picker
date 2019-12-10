import React, { PureComponent } from 'react';
import Swatch from './Swatch';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import { Icolors } from '../../interfaces';
import DescriptionColor from '../DescriptionColor';
import './styles.css';

// Interfaces
interface StateProps {
  colors: Icolors[];
  descr_enable: boolean;
}

interface DispatchProps {
  swatchClick: (index: number) => void;
  swatchAdd: () => void;
}

type Props = StateProps & DispatchProps;

class Colors extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.handleAddSwatch = this.handleAddSwatch.bind(this);
  }
  handleAddSwatch(e) {
    this.props.swatchAdd();
  }

  updateElems(colors) {
    this.swatches = colors.map(({ name, color, id }, index) => {
      return (
        <Swatch
          {...{ key: id, color, index, name }}
          handleClick={() => this.props.swatchClick(index)}
        />
      );
    });
  }

  UNSAFE_componentWillMount() {
    this.updateElems(this.props.colors);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    const { colors } = nextProps;
    if (this.props.colors !== nextProps.colors) {
      this.updateElems(colors);
    }
  }
  swatches;

  render() {
    let DescriptionComponent = this.props.descr_enable ? (
      <DescriptionColor />
    ) : null;
    return (
      <React.Fragment>
        <div className="cp_custom-colors">
          {this.swatches}
          <div
            onClick={this.handleAddSwatch}
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

// Redux Options
const mapStateToProps = ({ colors, description: { enable } }): StateProps => {
  return {
    colors,
    descr_enable: enable,
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
