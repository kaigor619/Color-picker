import React, { Component } from 'react';
import ThemeWarning from './ThemeWarning';
import Model from '../../options/modelsColor';
import { Icolors, IDescription } from '../../interfaces';
import { connect } from 'react-redux';
import * as Action from '../../actions';

import {
  StyleDescriptionColor,
  DescriptionSwatch,
  WrapDescrPart,
  WrapDescrOpacity,
  InputDescr,
  ImageEdit,
  ImageRemove,
} from './styles';

interface StateProps {
  model: any;
  type: string;
  opacity: number;
  description: IDescription;
  colors: Icolors[];
}

interface DispatchProps {
  change_description: (obj: IDescription) => void;
  change_colors: (colors: Icolors[]) => void;
}

type Props = StateProps & DispatchProps;

class DescriptionColor extends Component<Props> {
  state = {
    name: '',
    color: '',
  };
  inputColor: any = React.createRef();

  warningOptions = {
    save: {
      left: 'Yes',
      right: 'No',
      text: 'Save color ?',
      funcYes: this.onSaveColor.bind(this),
      funcNo: this.onCancelColor.bind(this),
    },
    edit: {
      left: 'Yes',
      right: 'No',
      text: 'Save color ?',
      funcYes: this.onSaveEditColor.bind(this),
      funcNo: this.onCancelEditColor.bind(this),
    },
    remove: {
      left: 'Yes',
      right: 'No',
      text: 'Delete this swatch?',
      funcYes: this.onYesDeleteColor.bind(this),
      funcNo: this.onNoDeleteColor.bind(this),
    },
  };

  componentDidMount() {
    this.update();
  }

  update() {
    const { description, colors } = this.props;

    const { name, color } = colors[description.index];

    this.setState({ name, color });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Props
    let { model, opacity, description } = this.props;
    let {
      model: md,
      opacity: op,
      description: descr,
      colors: clrs,
      type,
    } = nextProps;

    let bool = false;

    if (description !== descr) {
      let { name, color } = clrs[descr.index];
      this.setState({
        name,
        color,
      });
      bool = true;
    }

    if (model !== md || opacity !== op) {
      if (descr.edit || descr.save) {
        // let cl = Model[type].getString(model, opacity);
        // this.setState({ color: cl });
        bool = true;
      } else if (
        !descr.edit &&
        !descr.save &&
        !descr.remove &&
        descr.index == description.index
      ) {
        this.props.change_description({
          ...descr,
          enable: false,
          save: false,
          remove: false,
          edit: false,
        });
      }
    }

    for (let key in this.state) {
      if (this.state[key] !== nextState[key]) {
        bool = true;
      }
    }

    return bool;
  }

  handleClickEdit(e) {
    const { description } = this.props;
    this.props.change_description({
      ...description,
      edit: true,
      remove: false,
      save: false,
    });
    this.inputColor.current.removeAttribute('disabled');
    this.inputColor.current.focus();
  }
  handleClickDelete(e) {
    const { description } = this.props;
    this.props.change_description({
      ...description,
      edit: false,
      remove: true,
      save: false,
    });
  }

  handleChange(e) {
    const { edit, save } = this.props.description;
    if (edit || save) {
      let name = e.target.value;
      this.setState({ name });
    }
  }
  onSaveColor() {
    let { name } = this.state;
    const { description, type, model, opacity } = this.props;
    const { index } = description;

    let color = Model[type].getString(model, opacity);

    let colors = this.props.colors.slice();
    colors.push({ name, color });
    this.props.change_colors(colors);

    this.props.change_description({
      ...description,
      edit: false,
      remove: false,
      save: false,
      enable: true,
    });
  }
  onCancelColor() {
    const { description } = this.props;

    this.props.change_description({
      ...description,
      edit: false,
      remove: false,
      save: false,
      enable: false,
    });
  }
  onSaveEditColor() {
    const { description, model, type, opacity } = this.props;
    const { index } = description;
    let { name } = this.state;
    let color = Model[type].getString(model, opacity);

    let colors = this.props.colors.slice();
    colors[index] = { name, color };
    this.props.change_colors(colors);

    this.props.change_description({
      ...description,
      edit: false,
      remove: false,
      save: false,
      enable: true,
    });
  }
  onCancelEditColor() {
    const { description } = this.props;
    this.props.change_description({
      ...description,
      edit: false,
      remove: false,
      save: false,
      enable: true,
    });
  }
  onYesDeleteColor() {
    const { description } = this.props;
    const { index } = description;

    let colors = this.props.colors.slice();
    colors.splice(index, 1);
    this.props.change_colors(colors);

    this.props.change_description({
      index: 0,
      edit: false,
      remove: false,
      save: false,
      enable: false,
    });
  }
  onNoDeleteColor() {
    const { description } = this.props;
    this.props.change_description({
      ...description,
      edit: false,
      remove: false,
      save: false,
    });
  }

  render() {
    const { description, type, model, opacity } = this.props;
    const { enable, index, save, edit } = description;
    if (!enable) return null;
    const { warningOptions } = this;

    let warningComponent;
    for (let key in warningOptions) {
      if (description[key]) {
        warningComponent = <ThemeWarning {...warningOptions[key]} />;
      }
    }

    let { color, name } = this.state;
    if (save || edit) {
      color = Model[type].getString(model, opacity);
      if (save) {
        this.inputColor.current.removeAttribute('disabled');
        this.inputColor.current.focus();
      }
    }

    return (
      <StyleDescriptionColor>
        <WrapDescrPart>
          <WrapDescrOpacity>
            <DescriptionSwatch color={color} />
          </WrapDescrOpacity>
          <InputDescr
            ref={this.inputColor}
            className="label_descr_color"
            value={name}
            disabled={true}
            onChange={this.handleChange.bind(this)}
          />
        </WrapDescrPart>
        <WrapDescrPart>
          <ImageEdit
            src="./svg/pencil.svg"
            alt="Edit color"
            onClick={this.handleClickEdit.bind(this)}
          />
          <ImageRemove
            src="./svg/delete.svg"
            alt="Delete color"
            onClick={this.handleClickDelete.bind(this)}
          />
        </WrapDescrPart>
        {warningComponent}
      </StyleDescriptionColor>
    );
  }
}

const mapStateToProps = ({
  colors,
  models,
  type,
  opacity,
  description,
}): StateProps => {
  return {
    colors,
    model: models[type],
    type,
    opacity,
    description,
  };
};

const mapDispatchToProps = {
  change_description: Action.eventChangeDescription,
  change_colors: Action.eventChangeColors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DescriptionColor);
