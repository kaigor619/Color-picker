import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../actions';
import './styles.css';

interface DispatchProps {
  clickOk: () => void;
  clickCancel: () => void;
}
type Props = DispatchProps;

export class MainBtns extends Component<Props> {
  render() {
    return (
      <div className="cp_main-btns">
        <button
          className="cp_main-btns-button ok"
          onClick={() => this.props.clickOk()}
        >
          Ok
        </button>
        <button
          className="cp_main-btns-button cancel"
          onClick={() => this.props.clickCancel()}
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
