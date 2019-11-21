import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import './styles.css';
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
  changeType,
}: IBtnChangeProps) {
  let active = false;
  if (type == name) active = true;

  let classNames = active ? 'cp_btn-type active' : 'cp_btn-type';

  return (
    <li>
      <button className={classNames} onClick={() => changeType(name)}>
        {text}
      </button>
    </li>
  );
};

const mapStateToProps = ({ type }) => {
  return {
    type,
  };
};

const mapDispatchToProps = {
  changeType: Action.eventBtnChangeType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BtnChangeType);
