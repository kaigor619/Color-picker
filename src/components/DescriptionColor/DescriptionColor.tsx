import React, { Component } from "react";
import { connect } from "react-redux";
import { IuserColors, Icolors } from "../../interfaces";
import SaveColor from "./SaveColor";
import DeleteColor from "./DeleteColor";
import SaveEditColor from "./DeleteColor";
import SaveWarning from "./SaveWarning";
import * as Action from "../../actions";

interface StateProps {
  userColors: IuserColors;
}

interface DispatchProps {
  change_colors: (mas: Icolors) => void;
  change_edit: (edit: boolean) => void;
}

type Props = StateProps & DispatchProps;

class DescriptionColor extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  state = {
    label: "",
    edit: false,
    delete: false,
    save: false
  };

  inputColor: any = React.createRef();

  handleClickEdit(e) {
    // this.props.change_edit(true);
    this.setState({ edit: true });
    // this.inputColor.current.focus();
  }
  handleClickDelete(e) {
    let { userColors } = this.props;
    let { colors } = userColors;
    let { index } = userColors.description;
    let cs = colors.slice();
    cs.splice(index, 1);
    this.setState({ delete: true });
    // this.props.change_colors(cs);
  }

  handleChange(e) {
    if (this.props.userColors.description.edit) {
      let label = e.target.value;
      this.setState({ label });
    }
  }
  componentDidMount() {
    this.update();
  }
  update() {
    const { userColors } = this.props;
    const { colors } = userColors;
    const { index, edit } = userColors.description;
    const { name } = colors[index];
    if (edit) {
      this.inputColor.current.focus();
    }
    this.setState({ label: name, edit });
  }

  componentDidUpdate(prevProps) {
    const { userColors } = this.props;
    if (userColors.description.edit) {
      this.inputColor.current.focus();
    }
    if (
      userColors.description.index !== prevProps.userColors.description.index ||
      userColors.description.enable !==
        prevProps.userColors.description.enable ||
      userColors.description.edit !== prevProps.userColors.description.edit
    ) {
      this.update();
    }
  }
  render() {
    const { userColors } = this.props;
    const { colors } = userColors;
    const { enable, index } = userColors.description;
    if (!enable) return null;
    const { color, name } = colors[index];

    return (
      <div className="w_descr_custom_color" id="w_descr_custom_color">
        <div className="descr_custom_color" id="descr_custom_color">
          <div className="wrap_descr_parts">
            <div className="opacity_descr_color">
              <div
                className="client_c_color_descr"
                id="client_c_color_descr"
                style={{ backgroundColor: color }}
              ></div>
            </div>
            <input
              ref={this.inputColor}
              className="label_descr_color"
              id="label_descr_color"
              value={this.state.label}
              // readOnly={true}
              onChange={this.handleChange}
            />
          </div>
          <div className="wrap_descr_parts">
            <img
              className="descr_c_pencil"
              id="descr_c_pencil"
              src="./svg/pencil.svg"
              alt=""
              onClick={this.handleClickEdit}
            />
            <img
              className="descr_c_delete"
              id="descr_c_delete"
              src="./svg/delete.svg"
              alt=""
              onClick={this.handleClickDelete}
            />
          </div>

          <SaveColor enable={false} />
          <DeleteColor enable={false} />
          <SaveEditColor enable={false} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userColors }): StateProps => {
  return {
    userColors
  };
};

const mapDispatchToProps: DispatchProps = {
  change_colors: Action.change_users_colors,
  change_edit: Action.change_users_colors_edit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DescriptionColor);
