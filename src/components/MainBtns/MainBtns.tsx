import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WrapMainBtns, BtnOk, BtnCancel } from './styles';
import * as Action from '../../actions';

interface StateProps {}
interface DispatchProps {}
type Props = StateProps & DispatchProps;

export class MainBtns extends Component<Props> {
  render() {
    return (
      <WrapMainBtns>
        <BtnOk className="btn_color_ok" id="btn_color_ok">
          Ok
        </BtnOk>
        <BtnCancel className="btn_color_cancel" id="btn_color_cancel">
          Cancel
        </BtnCancel>
      </WrapMainBtns>
    );
  }
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps,
)(MainBtns);
