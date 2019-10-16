import React, { Component } from 'react';
import { InputColor } from './styles';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import { nextTick } from 'q';

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
  constructor(props: Props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
  }
  state = {
    label: '',
  };
  componentWillMount() {
    const { opacityBool, hexBool, opacity, model, index } = this.props;
    let value;
    if (opacityBool) {
      value = opacity;
    } else if (hexBool) value = model;
    else if (!hexBool) value = String(model[index]);

    this.setState({ label: value });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { opacityBool, hexBool, opacity, model, index } = this.props;
    let bool = false;
    let label = '';
    if (opacityBool) {
      if (nextProps.opacity !== opacity) {
        label = String(nextProps.opacity);
      }
    } else if (!hexBool) {
      // debugger;
      if (nextProps.model[index] !== model[index]) {
        label = String(nextProps.model[index]);
      }
    } else if (hexBool) {
      if (nextProps.model !== model) {
        label = String(nextProps.model);
      }
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
    const { hexBool, index, model, opacityBool } = this.props;
    let value,
      label = '';

    let text: string = e.target.value;
    if (!hexBool) {
      text = text.replace(/[^\d.-]/g, '');
    }
    label = text;
    if (text !== this.state.label) {
      if (opacityBool) {
        this.props.changeOpacity(+text);
      } else {
        this.props.changeModel(text, index);
      }
      this.setState({ label });
    }
  }

  render() {
    let { label } = this.state;
    let { maxLength, model, index, opacityBool, hexBool } = this.props;

    let options = {
      type: 'text',
      maxLength: maxLength,
      value: String(label),
      onChange: this.inputChange,
      hex: hexBool,
    };

    let component = <InputColor {...options} />;
    return component;
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
