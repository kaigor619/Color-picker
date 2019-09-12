import React from "react";
import { connect } from "react-redux";
import * as Action from "../../actions";

interface IBtnChangeProps {
  name: string;
  text: string;
  type: string;
  changeType: (type: string) => void;
}

const BtnChangeType = function({
  name,
  text,
  type,
  changeType
}: IBtnChangeProps) {
  let classNames = "btn_select_color";
  // const {type}=this.props;
  if (type == name) classNames += " active";
  return (
    <li className="type_color">
      <button className={classNames} onClick={() => changeType(name)}>
        {text}
      </button>
    </li>
  );
};

const mapStateToProps = ({ type }) => {
  return {
    type
  };
};

const mapDispatchToProps = {
  changeType: Action.change_type
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BtnChangeType);
