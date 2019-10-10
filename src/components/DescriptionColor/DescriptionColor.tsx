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
  rgbMain: number[];
  description: IDescription;
  colors: Icolors;
}

interface DispatchProps {
  change_description: (obj: IDescription) => void;
  change_colors: (colors: Icolors[]) => void;
}

type Props = StateProps & DispatchProps;

class DescriptionColor extends Component<Props> {
  state = {
    name: '',
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

  // componentDidMount() {
  //   this.update();
  // }

  // update() {
  //   const { name, color, edit, save, remove } = this.props;

  //   this.setState({ name, color, edit, save, remove });
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // Props
  //   console.log(nextProps.description);
  //   let {
  //     name,
  //     color,
  //     index,
  //     save,
  //     edit,
  //     remove,
  //     rgbMain,
  //     opacity,
  //     description,
  //   } = this.props;
  //   let {
  //     name: n,
  //     color: c,
  //     index: ind,
  //     save: sv,
  //     edit: ed,
  //     remove: rv,
  //     rgbMain: r,
  //     opacity: op,
  //     description: descr,
  //   } = nextProps;

  //   if (
  //     name !== n ||
  //     color !== c ||
  //     index !== ind ||
  //     edit !== ed ||
  //     save !== sv ||
  //     remove !== rv
  //   ) {
  //     this.setState({
  //       name: n,
  //       color: c,
  //       edit: ed,
  //       save: sv,
  //       remove: rv,
  //       index: ind,
  //     });
  //   }

  //   if (rgbMain !== r || opacity !== op) {
  //     if (nextState.edit || nextState.save) {
  //       this.inputColor.current.removeAttribute('disabled');
  //       this.inputColor.current.focus();
  //       let cl = Model.rgb.getString(r, opacity);
  //       this.setState({ color: cl });
  //     } else if (!nextState.edit && !nextState.save && !nextState.remove) {
  //       this.props.change_description(false);
  //     }
  //   }

  //   let bool = false;

  //   for (let key in this.state) {
  //     if (this.state[key] !== nextState[key]) {
  //       bool = true;
  //     }
  //   }
  //   // if (description !== descr) bool = true;

  //   return bool;
  // }

  handleClickEdit(e) {
    // this.setState({ edit: true });
    // this.inputColor.current.removeAttribute('disabled');
    // this.inputColor.current.focus();
  }
  handleClickDelete(e) {
    // this.setState({ remove: true });
  }

  handleChange(e) {
    // const { edit, save } = this.state;
    // if (edit || save) {
    //   let name = e.target.value;
    //   this.setState({ name });
    // }
  }
  onSaveColor() {
    // let { color, name } = this.state;
    // this.props.addSwatch({ color, name });
    // this.setState({ save: false });
  }
  onCancelColor() {
    // this.setState({ save: false });
    // this.props.change_description(false);
  }
  onSaveEditColor() {
    // let { color, name } = this.state;
    // let { index } = this.props;
    // this.props.changeSwatch({ color, name, index });
    // this.setState({ edit: false });
  }
  onCancelEditColor() {
    // let { name, color } = this.props;
    // this.setState({ edit: false, color, name });
  }
  onYesDeleteColor() {
    // let { index } = this.props;
    // this.props.deleteSwatch(index);
    // this.setState({ remove: false });
    // this.props.change_description(false);
  }
  onNoDeleteColor() {
    // this.setState({ remove: false });
  }

  render() {
    const { description, colors } = this.props;
    const { enable, index } = description;
    if (!enable) return null;
    const { warningOptions } = this;

    let warningComponent;
    for (let key in warningOptions) {
      if (description[key]) {
        warningComponent = <ThemeWarning {...warningOptions[key]} />;
      }
    }

    let { color, name } = colors[index];
    console.log(color);

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

const mapStateToProps = ({
  colors,
  models,
  type,
  opacity,
  rgbMain,
  description,
}): StateProps => {
  return {
    colors,
    model: models[type],
    type,
    opacity,
    rgbMain,
    description,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    change_description: obj => dispatch(Action.change_description(obj)),
    change_colors: colors => dispatch(Action.change_users_colors(colors)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DescriptionColor);
