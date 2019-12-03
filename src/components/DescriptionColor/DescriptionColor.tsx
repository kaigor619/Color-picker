import React, { Component } from 'react';
import ThemeWarning from './ThemeWarning';
import Model from '../../options/modelsColor';
import { Icolors, IDescription } from '../../interfaces';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import { CSSTransition } from 'react-transition-group';

import './styles.css';

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
      funcYes: () => this.onSaveColor(),
      funcNo: () => this.onCancelColor(),
    },
    edit: {
      left: 'Yes',
      right: 'No',
      text: 'Save color ?',
      funcYes: () => this.onSaveEditColor(),
      funcNo: () => this.onCancelEditColor(),
    },
    remove: {
      left: 'Yes',
      right: 'No',
      text: 'Delete this swatch?',
      funcYes: () => this.onYesDeleteColor(),
      funcNo: () => this.onNoDeleteColor(),
    },
  };
  didmount = false;

  componentDidMount() {
    this.update();
    this.didmount = true;
  }

  update() {
    const { description, colors } = this.props;
    const { save, index } = description;

    if (save) {
      this.inputColor.current.removeAttribute('disabled');
      this.inputColor.current.focus();
      this.setState({ name: `Color ${colors.length + 1}` });
    } else {
      let { name, color } = colors[index];
      this.setState({
        name,
        color,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Props
    let { model, opacity, description } = this.props;
    let {
      model: md,
      opacity: op,
      description: descr,
      colors: clrs,
    } = nextProps;

    let bool = false;

    if (description !== descr) {
      if (descr.save) {
        this.inputColor.current.removeAttribute('disabled');
        this.inputColor.current.focus();
        this.setState({ name: `Colors ${clrs.length + 1}` });
      } else {
        let { name, color } = clrs[descr.index];
        this.setState({
          name,
          color,
        });
      }
      bool = true;
    }

    if (model !== md || opacity !== op) {
      if (descr.edit || descr.save) bool = true;
      else if (
        !descr.edit &&
        !descr.save &&
        !descr.remove &&
        descr.index === description.index
      )
        this.props.change_description(this.getDescriptionWithout());
    }

    for (let key in this.state) {
      if (this.state[key] !== nextState[key]) {
        bool = true;
      }
    }

    return bool;
  }

  getDescriptionWithout(...args) {
    const { description } = this.props;
    let arr_keys = ['edit', 'remove', 'save', 'enable'];
    let descr = Object.assign({}, description);
    if (args.length >= 1) {
      arr_keys.forEach(item => {
        let bool = args.some(str => str === item);
        descr[item] = bool ? true : false;
      });
    } else {
      arr_keys.forEach(item => {
        descr[item] = false;
      });
    }
    return descr;
  }

  handleChange(e) {
    const { edit, save } = this.props.description;
    if (edit || save) {
      let name = e.target.value;
      this.setState({ name });
    }
  }

  handleClickEdit() {
    this.props.change_description(this.getDescriptionWithout('edit', 'enable'));
    this.inputColor.current.removeAttribute('disabled');
    this.inputColor.current.focus();
  }
  handleClickDelete() {
    this.props.change_description(
      this.getDescriptionWithout('remove', 'enable'),
    );
  }

  onSaveColor() {
    let { name } = this.state;
    const { type, model, opacity } = this.props;

    let color = Model[type].getString(model, opacity);

    let colors = this.props.colors.slice();
    colors.push({ name, color });
    let index = colors.length - 1;
    this.props.change_colors(colors);

    this.props.change_description({
      ...this.getDescriptionWithout('enable'),
      index,
    });
  }

  onCancelColor() {
    this.props.change_description(this.getDescriptionWithout());
  }
  onSaveEditColor() {
    const { description, model, type, opacity } = this.props;
    const { index } = description;
    let { name } = this.state;
    let color = Model[type].getString(model, opacity);

    let colors = this.props.colors.slice();
    colors[index] = { name, color };
    this.props.change_colors(colors);

    this.props.change_description(this.getDescriptionWithout('enable'));
  }
  onCancelEditColor() {
    this.props.change_description(this.getDescriptionWithout('enable'));
  }
  onYesDeleteColor() {
    const { description } = this.props;
    const { index } = description;

    let colors = this.props.colors.slice();
    colors.splice(index, 1);
    this.props.change_colors(colors);

    this.props.change_description({
      ...this.getDescriptionWithout(),
      index: 0,
    });
  }
  onNoDeleteColor() {
    this.props.change_description(this.getDescriptionWithout('enable'));
  }

  options_warning = this.warningOptions.save;
  style = {
    backgroundColor: '#fff',
  };

  render() {
    const { description, type, model, opacity } = this.props;
    const { save, edit } = description;
    const { warningOptions } = this;
    let { color, name } = this.state;

    let on = false;
    for (let key in warningOptions) {
      if (description[key]) {
        on = !this.didmount ? false : true;
        this.options_warning = warningOptions[key];
      }
    }

    color = save || edit ? Model[type].getString(model, opacity) : color;
    this.style = { backgroundColor: color };

    return (
      <div className="cp_descr-color">
        <div className="cp_descr-container">
          <div className="cp_descr-part">
            <div className="cp_descr-opacity">
              <div className="cp_descr-swatch" style={this.style} />
            </div>
            <input
              ref={this.inputColor}
              className="cp_descr-input"
              value={name}
              disabled={true}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="cp_descr-part">
            <img
              className="cp_descr-icon cp_descr-edit"
              src="./svg/pencil.svg"
              alt="Edit color"
              onClick={() => this.handleClickEdit()}
            />
            <img
              className="cp_descr-icon cp_descr-remove"
              src="./svg/delete.svg"
              alt="Delete color"
              onClick={() => this.handleClickDelete()}
            />
          </div>
          <CSSTransition
            in={on}
            timeout={300}
            classNames="warning"
            unmountOnExit
          >
            <ThemeWarning {...this.options_warning} />
          </CSSTransition>
        </div>
      </div>
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
