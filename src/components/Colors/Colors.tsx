import React, { Component } from 'react';
import Swatch from './Swatch';
import { IuserColors } from '../../interfaces';
import { connect } from 'react-redux';
import Model from '../../options/modelsColor';
import * as Action from '../../actions';
import DescriptionColor from '../DescriptionColor';
import { Icolors } from '../../interfaces';
import { StyleCustomColors, StyleAddColor } from './styles';
import { bool } from 'prop-types';
interface StateProps {
  colors: Icolors;
  type: string;
  model: string;
  opacity: number;
}

interface DispatchProps {
  change_colors: (colors: Icolors) => void;
}

type Props = StateProps & DispatchProps;

class Colors extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleAddSwatch = this.handleAddSwatch.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.changeSwatch = this.changeSwatch.bind(this);
    this.deleteSwatch = this.deleteSwatch.bind(this);
    this.addSwatch = this.addSwatch.bind(this);

    this.changeEnable = this.changeEnable.bind(this);
  }

  state = {
    name: 'color 1',
    color: '#000',
    index: 0,
    save: false,
    edit: false,
    remove: false,
    enable: false,
  };

  counter = 1;
  labelCounter = 'Color';

  changeSwatch(obj) {
    let { index, color, name } = obj;
    let colors = this.props.colors.slice();
    colors[index] = { name, color };

    this.props.change_colors(colors);
  }
  deleteSwatch(index) {
    let colors = this.props.colors.slice();
    colors.splice(index, 1);
    this.props.change_colors(colors);
  }
  addSwatch(obj) {
    let { color, name } = obj;
    let colors = this.props.colors.slice();
    colors.push({ color, name });

    this.props.change_colors(colors);
  }

  handleAddSwatch(e) {
    const { colors, model, type, opacity } = this.props;
    let color = Model[type].getString(model, opacity);
    this.counter += 1;
    let name = `${this.labelCounter} ${this.counter}`;
    this.setState({
      name,
      color,
      save: true,
      edit: false,
      remove: false,
      enable: true,
    });
  }
  changeEnable(enable) {
    this.setState({ enable });
  }
  handleClick(index: number) {
    const edit = false;
    const save = false;
    const remove = false;
    const enable = true;
    let { color, name } = this.props.colors[index];
    this.setState({ name, color, edit, save, remove, enable, index });
  }
  componentDidMount() {
    const { colors } = this.props;
    this.counter = colors.length;
  }
  shouldComponentUpdate(nextProps, nextState) {
    let bool = false;

    if (this.props.colors !== nextProps.colors) {
      bool = true;
    }
    for (let key in this.state) {
      if (this.state[key] !== nextState[key]) {
        bool = true;
      }
    }

    return bool;
  }
  render() {
    const { colors } = this.props;
    let swatches = colors.map(({ name, color }, index) => {
      return (
        <Swatch
          key={name}
          color={color}
          index={index}
          name={name}
          handleClick={this.handleClick}
        />
      );
    });

    let descriptionComponent;
    if (this.state.enable)
      descriptionComponent = (
        <DescriptionColor
          {...this.state}
          changeSwatch={this.changeSwatch}
          deleteSwatch={this.deleteSwatch}
          addSwatch={this.addSwatch}
          changeEnable={this.changeEnable}
        />
      );
    return (
      <React.Fragment>
        <StyleCustomColors className="custom-colors">
          {swatches}
          <StyleAddColor
            onClick={this.handleAddSwatch}
            className="add_new_color"
            id="add_new_color"
          >
            <img src="./svg/plus-symbol.svg" alt="" />
          </StyleAddColor>
        </StyleCustomColors>
        {descriptionComponent}
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ colors, models, type, opacity }): StateProps => {
  return {
    colors,
    model: models[type],
    type,
    opacity,
  };
};

const mapDispatchToProps: DispatchProps = {
  change_colors: Action.change_users_colors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Colors);
