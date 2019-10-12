import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import { StyleBtn } from './styles';

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
  return (
    <li>
      <StyleBtn active={active} onClick={() => changeType(name)}>
        {text}
      </StyleBtn>
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
