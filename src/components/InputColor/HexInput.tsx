import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WrapColorInputs } from './styles';
import { InitialState } from '../../reducers';
import InputCell from './InputCell';

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
        <WrapColorInputs>
          <InputCell key={1} index={1} hexBool={true} maxLength={9} />
        </WrapColorInputs>
      </li>
    );
  }
}

const mapStateToProps = ({ type }) => ({ type });

export default connect(mapStateToProps)(HslInput);
