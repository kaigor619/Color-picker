import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputCell from './InputCell';
import './styles.css';

interface StateProps {
  type: string;
}
type Props = StateProps;

class HslInput extends Component<Props> {
  type = 'hex';

  render() {
    const { type } = this.props;

    if (this.type !== type) return null;
    return (
      <li>
        <div className="cp_model-w">
          <InputCell key={1} index={1} hexBool={true} maxLength={9} />
        </div>
      </li>
    );
  }
}

const mapStateToProps = ({ type }) => ({ type });

export default connect(mapStateToProps)(HslInput);
