import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import classNames from 'classnames';
import './styles.css';

// Interfaces
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
  let elemClass = classNames('cp_btn-type', { active: type === name });

  return (
    <li>
      <button className={elemClass} onClick={() => changeType(name)}>
        {text}
      </button>
    </li>
  );
};

const mapStateToProps = ({ type }) => {
  return { type };
};

const mapDispatchToProps = {
  changeType: Action.eventBtnChangeType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BtnChangeType);
