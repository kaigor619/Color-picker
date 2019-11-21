import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InitialState } from '../../reducers';
import InputCell from './InputCell';
import './styles.css';

interface StateProps {
  type: string;
}
type Props = StateProps;

class RgbInput extends Component<Props> {
  type = 'rgb';

  render() {
    const { type } = this.props;
    const { rgb } = InitialState.models;

    if (this.type !== type) return null;
    let inputs = rgb.map((item, index) => {
      return <InputCell key={index} index={index} maxLength={4} />;
    });
    let inputOpacity = (
      <InputCell
        key={rgb.length}
        index={rgb.length}
        maxLength={9}
        opacityBool={true}
      />
    );
    return (
      <li>
        <div className="cp_model-w">
          {inputs}
          {inputOpacity}
        </div>
      </li>
    );
  }
}
const mapStateToProps = ({ type }) => ({ type });

export default connect(mapStateToProps)(RgbInput);
