import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import * as Action from '../../actions';

interface StateProps {
  model: number[] | string[];
  opacity: number;
  type: string;
}
interface DispatchProps {
  changeModel: (val: string | number, index: number) => void;
  changeOpacity: (opacity: number) => void;
}

interface IInputCell {
  maxLength: number;
  index: number;
  opacityBool?: boolean;
  hexBool?: boolean;
}

type Props = StateProps & DispatchProps & IInputCell;

class InputCell extends Component<Props> {
  state = {
    label: '',
  };
  componentDidMount() {
    const { opacityBool, hexBool, opacity, model, index } = this.props;
    let label;
    if (opacityBool) label = opacity;
    else if (hexBool) label = model;
    else if (!hexBool) label = String(model[index]);
    this.setState({ label });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { opacityBool, hexBool, opacity, model, index } = this.props;
    let bool = false;
    let label = '';
    if (opacityBool) {
      if (nextProps.opacity !== opacity) label = String(nextProps.opacity);
    } else if (!hexBool) {
      if (nextProps.model[index] !== model[index])
        label = String(nextProps.model[index]);
    } else if (hexBool) {
      if (nextProps.model !== model) label = String(nextProps.model);
    }
    if (nextState.label !== this.state.label) {
      label = String(nextState.label);
      bool = true;
    }

    if (label !== '') {
      this.setState({ label });
    }

    return bool;
  }

  inputChange(e) {
    const { hexBool, index, opacityBool } = this.props;

    let label = e.target.value;
    if (!hexBool) {
      label = label.replace(/[^\d.-]/g, '');
    }
    if (label !== this.state.label) {
      if (opacityBool) this.props.changeOpacity(+label);
      else this.props.changeModel(label, index);

      this.setState({ label });
    }
  }
  options = {
    type: 'text',
    maxLength: this.props.maxLength,
    value: String(this.state.label),
    onChange: e => this.inputChange(e),
    className: this.props.hexBool ? 'cp_model-input hex' : 'cp_model-input',
  };

  render() {
    this.options.value = this.state.label;

    return <input {...this.options} />;
  }
}

const mapStateToProps = ({ type, models, opacity }: any): StateProps => {
  return {
    type,
    model: models[type],
    opacity,
  };
};

const mapDispatchToProps: DispatchProps = {
  changeModel: Action.eventChangeInputModel,
  changeOpacity: Action.eventChangeInputOpacity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputCell);
