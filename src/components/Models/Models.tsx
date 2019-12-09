import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import InputCell from '../InputCell';

interface StateProps {
  type: string;
}
type Props = StateProps;
export class Models extends PureComponent<Props> {
  inputs;
  UNSAFE_componentWillMount() {
    const { type } = this.props;
    this.update(type);
  }
  UNSAFE_componentWillUpdate(nextProps) {
    const { type } = nextProps;
    this.update(type);
  }
  update(type: string) {
    const { models } = store.getState();
    let value = models[type];
    if (typeof value == 'string') {
      this.inputs = <InputCell maxLength={9} hexBool={true} index={1} />;
    } else if (typeof value == 'object' && value.slice) {
      this.inputs = value.map((elem, index) => (
        <InputCell key={index} index={index} maxLength={4} />
      ));
      this.inputs.push(
        <InputCell
          key={value.length}
          index={value.length}
          maxLength={4}
          opacityBool={true}
        />,
      );
    }
  }
  render() {
    return (
      <li>
        <div className="cp_model-w">{this.inputs}</div>
      </li>
    );
  }
}

const mapStateToProps = ({ type }) => ({ type });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Models);
