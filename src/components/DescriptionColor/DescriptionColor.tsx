import React, { Component } from 'react';
import SaveColor from './SaveColor';
import DeleteColor from './DeleteColor';
import SaveEditColor from './SaveEditColor';
import Model from '../../options/modelsColor';
import { connect } from 'react-redux';

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
  rgbMain: number[];
}

interface OwnProps {
  name: string;
  color: string;
  edit?: boolean;
  save?: boolean;
  remove?: boolean;
  changeSwatch: (obj: { name: string; color: string; index: number }) => void;
  deleteSwatch: (index: number) => void;
  addSwatch: (obj: { name: string; color: string }) => void;
  changeEnable: (enable: boolean) => void;
  index: number;
}
interface DispatchProps {}

type Props = StateProps & OwnProps & DispatchProps;

class DescriptionColor extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);

    this.onSaveColor = this.onSaveColor.bind(this);
    this.onCancelColor = this.onCancelColor.bind(this);

    this.onSaveEditColor = this.onSaveEditColor.bind(this);
    this.onCancelEditColor = this.onCancelEditColor.bind(this);

    this.onYesDeleteColor = this.onYesDeleteColor.bind(this);
    this.onNoDeleteColor = this.onNoDeleteColor.bind(this);
  }
  state = {
    name: '',
    color: '',
    edit: false,
    save: false,
    remove: false,
  };
  inputColor: any = React.createRef();

  componentDidMount() {
    console.log('didmount');
    this.update();
  }

  update() {
    const { name, color, edit, save, remove } = this.props;

    this.setState({ name, color, edit, save, remove });
  }

  // componentDidUpdate(prevProps) {
  //   console.log('update');
  //   const { name, color, edit, save, rgbMain, opacity } = this.props;
  //   const { edit: ed, save: sv, remove: rw } = this.state;
  //   const {
  //     name: n,
  //     color: c,
  //     edit: e,
  //     save: s,
  //     rgbMain: r,
  //     opacity: op,
  //   } = prevProps;
  // if (name !== n || color !== c || edit !== e || save !== s) {
  //   this.update();
  // }
  // if (rgbMain !== r || opacity !== op) {
  //   if (ed || sv) {
  //     this.inputColor.current.removeAttribute('disabled');
  //     this.inputColor.current.focus();
  //     let cl = Model.rgb.getString(rgbMain, opacity);
  //     this.setState({ color: cl });
  //   } else if (!ed && !sv && !rw) {
  //     this.props.changeEnable(false);
  //   }
  // }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should');
    // Props
    let {
      name,
      color,
      index,
      save,
      edit,
      remove,
      rgbMain,
      opacity,
    } = this.props;
    let {
      name: n,
      color: c,
      index: ind,
      save: sv,
      edit: ed,
      remove: rv,
      rgbMain: r,
      opacity: op,
    } = nextProps;

    let cx = false;

    if (
      name !== n ||
      color !== c ||
      index !== ind ||
      edit !== ed ||
      save !== sv ||
      remove !== rv
    ) {
      this.setState({
        name: n,
        color: c,
        edit: ed,
        save: sv,
        remove: rv,
        index: ind,
      });
    }

    // if (ed || sv) {
    //   this.inputColor.current.removeAttribute('disabled');
    //   this.inputColor.current.focus();
    //   if (rgbMain !== r || opacity !== op) {
    //     let cl = Model.rgb.getString(r, opacity);
    //     this.setState({ color: cl });
    //   }
    // }
    // else if (!ed && !sv && !rv) {
    //   this.props.changeEnable(false);
    // }
    if (rgbMain !== r || opacity !== op) {
      console.log(nextState.edit);
      if (nextState.edit || nextState.save) {
        this.inputColor.current.removeAttribute('disabled');
        this.inputColor.current.focus();
        let cl = Model.rgb.getString(r, opacity);
        this.setState({ color: cl });
      } else if (!nextState.edit && !nextState.save && !nextState.remove) {
        this.props.changeEnable(false);
      }
    }

    let bool = false;

    for (let key in this.state) {
      if (this.state[key] !== nextState[key]) {
        bool = true;
      }
    }

    return bool;
  }

  handleClickEdit(e) {
    this.setState({ edit: true });
    this.inputColor.current.removeAttribute('disabled');
    this.inputColor.current.focus();
  }
  handleClickDelete(e) {
    this.setState({ remove: true });
  }

  handleChange(e) {
    const { edit, save } = this.state;
    if (edit || save) {
      let name = e.target.value;
      this.setState({ name });
    }
  }
  onSaveColor() {
    let { color, name } = this.state;
    this.props.addSwatch({ color, name });
    this.setState({ save: false });
  }
  onCancelColor() {
    this.setState({ save: false });
    this.props.changeEnable(false);
  }
  onSaveEditColor() {
    let { color, name } = this.state;
    let { index } = this.props;
    this.props.changeSwatch({ color, name, index });
    this.setState({ edit: false });
  }
  onCancelEditColor() {
    let { name, color } = this.props;

    this.setState({ edit: false, color, name });
  }
  onYesDeleteColor() {
    let { index } = this.props;
    this.props.deleteSwatch(index);
    this.setState({ remove: false });
    this.props.changeEnable(false);
  }
  onNoDeleteColor() {
    this.setState({ remove: false });
  }

  render() {
    console.log('render');
    const { name, color, edit, save, remove } = this.state;
    let warningComponent;
    if (save) {
      warningComponent = (
        <SaveColor
          onSaveColor={this.onSaveColor}
          onCancelColor={this.onCancelColor}
        />
      );
    } else if (edit) {
      warningComponent = (
        <SaveEditColor
          onSaveEditColor={this.onSaveEditColor}
          onCancelEditColor={this.onCancelEditColor}
        />
      );
    } else if (remove) {
      warningComponent = (
        <DeleteColor
          onYesDeleteColor={this.onYesDeleteColor}
          onNoDeleteColor={this.onNoDeleteColor}
        />
      );
    } else {
      warningComponent = null;
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
            onChange={this.handleChange}
          />
        </WrapDescrPart>
        <WrapDescrPart>
          <ImageEdit
            src="./svg/pencil.svg"
            alt="Edit color"
            onClick={this.handleClickEdit}
          />
          <ImageRemove
            src="./svg/delete.svg"
            alt="Delete color"
            onClick={this.handleClickDelete}
          />
        </WrapDescrPart>
        {warningComponent}
      </StyleDescriptionColor>
    );
  }
}

const mapStateToProps = ({ models, type, opacity, rgbMain }): StateProps => {
  return {
    model: models[type],
    type,
    opacity,
    rgbMain,
  };
};

export default connect(
  mapStateToProps,
  {},
)(DescriptionColor);
