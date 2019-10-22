import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WrapMainBtns, BtnOk, BtnCancel } from './styles';
import * as Action from '../../actions';

interface StateProps {}
interface DispatchProps {
  clickOk: () => void;
  clickCancel: () => void;
}
type Props = StateProps & DispatchProps;

export class MainBtns extends Component<Props> {
  render() {
    return (
      <WrapMainBtns>
        <BtnOk
          className="btn_color_ok"
          id="btn_color_ok"
          onClick={this.props.clickOk.bind(this)}
        >
          Ok
        </BtnOk>
        <BtnCancel
          className="btn_color_cancel"
          id="btn_color_cancel"
          onClick={this.props.clickCancel.bind(this)}
        >
          Cancel
        </BtnCancel>
      </WrapMainBtns>
    );
  }
}

const mapDispatchToProps = {
  clickOk: Action.eventClickOk,
  clickCancel: Action.eventClickCancel,
};

export default connect(
  null,
  mapDispatchToProps,
)(MainBtns);
