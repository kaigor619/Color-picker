import React, { PureComponent } from 'react';
import ThemeWarning from './ThemeWarning';
import Model from '../../options/modelsColor';
import { Icolors, IDescription } from '../../interfaces';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import { CSSTransition } from 'react-transition-group';
import store from '../../store/store';

import './styles.css';

interface StateProps {
  description: IDescription;
}

interface DispatchProps {
  change_description: (obj: IDescription) => void;
  change_colors: (colors: Icolors[]) => void;
  // getDerivedStateFromProps: (a, s) => void;
}

type Props = StateProps & DispatchProps;

class DescriptionColor extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  state = {
    name: '',
    color: '',
  };

  // Ref
  inputColor: any = React.createRef();
  swatch: any = React.createRef();

  // RgbMain
  rgbMain = this.getCurrentStore().rgbMain;
  opacity = this.getCurrentStore().opacity;
  index = this.getCurrentStore().index;

  // Warning
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

  // Redux Listener
  unsubscribeStore = () => {};

  componentWillUnmount() {
    this.unsubscribeStore();
  }
  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    this.update();
    this.didmount = true;
    this.updateInput();
  }
  updateInput() {
    let value = this.inputColor.current.value;
    if (this.state.name !== value) {
      this.inputColor.current.value = this.state.name;
    }
  }

  static getDerivedStateFromProps(props, state): any {
    let obj: any = {};
    const { description } = props;
    const { colors } = store.getState();
    const { save, index } = description;
    if (save) {
      obj['name'] = `Color ${colors.length + 1}`;
    } else {
      obj['name'] = colors[index].name;
      obj['color'] = colors[index].color;
    }

    return obj === {} ? null : obj;
  }

  update() {
    const { description } = this.props;
    const { save, index } = description;
    this.index = index;
    if (save) {
      this.FocusInput();
    }
  }
  getCurrentStore() {
    let {
      models,
      type,
      opacity,
      colors,
      rgbMain,
      description: { index },
    } = store.getState();
    return {
      models,
      type,
      opacity,
      colors,
      rgbMain,
      index,
    };
  }

  // Redux Listener
  updateStateFromStore = () => {
    const { rgbMain: r, opacity: o, index: i } = this.getCurrentStore();
    const { save, edit, remove, index } = this.props.description;
    if (this.rgbMain !== r || this.opacity !== o) {
      this.rgbMain = r;
      this.opacity = o;

      if (edit || save) {
        let { models, type, opacity } = this.getCurrentStore();
        let color = Model[type].getString(models[type], opacity);
        this.swatch.current.style.backgroundColor = color;
      }
      // Добавить в условие this.index!==index
      else if (i === this.index && !save && !edit && !remove) {
        this.index = index;
        this.props.change_description(this.getDescriptionWithout());
      }
    }
  };

  componentDidUpdate(prevProps) {
    const { description: d } = prevProps;
    const { description } = this.props;
    if (description !== d) {
      this.update();
    }
    this.updateInput();
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

  FocusInput() {
    this.inputColor.current.removeAttribute('disabled');
    this.inputColor.current.focus();
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
    this.FocusInput();
  }
  handleClickDelete() {
    this.props.change_description(
      this.getDescriptionWithout('remove', 'enable'),
    );
  }

  onSaveColor() {
    let name = this.inputColor.current.value;

    const { type, models, opacity, colors } = this.getCurrentStore();

    let color = Model[type].getString(models[type], opacity);

    let time = new Date().getTime();
    let cls = colors.slice();
    let id = name + ' ' + time;
    cls.push({ name, color, id });
    let index = cls.length - 1;
    this.props.change_colors(cls);

    this.props.change_description({
      ...this.getDescriptionWithout('enable'),
      index,
    });
  }

  onCancelColor() {
    this.props.change_description(this.getDescriptionWithout());
  }
  onSaveEditColor() {
    // const { description, model, type, opacity } = this.props;
    const { type, models, opacity, colors } = this.getCurrentStore();
    const { description } = this.props;
    const { index } = description;
    let name = this.inputColor.current.value;
    let color = Model[type].getString(models[type], opacity);

    let cls = colors.slice();
    cls[index] = { ...cls[index], name, color };

    this.props.change_colors(cls);

    this.props.change_description(this.getDescriptionWithout('enable'));
  }
  onCancelEditColor() {
    this.props.change_description(this.getDescriptionWithout('enable'));
  }
  onYesDeleteColor() {
    const { description } = this.props;
    const { index } = description;
    const { colors } = this.getCurrentStore();

    let cls = colors.slice();
    cls.splice(index, 1);
    this.props.change_colors(cls);

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
    const { description } = this.props;
    const { warningOptions } = this;
    let { color } = this.state;

    let on = false;
    for (let key in warningOptions) {
      if (description[key]) {
        on = this.didmount;
        this.options_warning = warningOptions[key];
      }
    }

    this.style = { backgroundColor: color };

    return (
      <div className="cp_descr-color">
        <div className="cp_descr-container">
          <div className="cp_descr-part">
            <div className="cp_descr-opacity">
              <div
                className="cp_descr-swatch"
                ref={this.swatch}
                style={this.style}
              />
            </div>
            <input
              ref={this.inputColor}
              className="cp_descr-input"
              // value={name}
              disabled={true}
              // onChange={this.handleChange}
            />
          </div>
          <div className="cp_descr-part">
            <img
              className="cp_descr-icon cp_descr-edit"
              src="./svg/pencil.svg"
              alt="Edit color"
              onClick={this.handleClickEdit}
            />
            <img
              className="cp_descr-icon cp_descr-remove"
              src="./svg/delete.svg"
              alt="Delete color"
              onClick={this.handleClickDelete}
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

const mapStateToProps = ({ description }): StateProps => {
  return {
    description,
  };
};

const mapDispatchToProps = {
  change_description: Action.eventChangeDescription,
  change_colors: Action.event_change_colors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DescriptionColor);
