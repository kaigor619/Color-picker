import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import './styles.css';

interface StateProps {}
interface DispatchProps {
  clickOk: () => void;
  clickCancel: () => void;
}
type Props = StateProps & DispatchProps;

export class MainBtns extends Component<Props> {
  render() {
    return (
      <div className="cp_main-btns">
        <button
          className="cp_main-btns-button ok"
          onClick={this.props.clickOk.bind(this)}
        >
          Ok
        </button>
        <button
          className="cp_main-btns-button cancel"
          onClick={this.props.clickCancel.bind(this)}
        >
          Cancel
        </button>
      </div>
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
