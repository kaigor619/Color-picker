import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IColorsOptions, IOptions } from '../../interfaces';
import * as Action from '../../actions';

// Style

// Interfaces
interface StateProps {
  //   enable: boolean;
}
interface DispatchProps {
  addColor: (options: IColorsOptions) => void;
  change_enable: (enable: boolean) => void;
  changeResize: () => void;
  changeOptions: (options: IOptions) => void;
}
interface OwnProps {
  options: IColorsOptions;
  picker: { width: number; height: number };
  circle: { width: number; height: number };
  count: any;
}
type Props = StateProps & DispatchProps & OwnProps;

// ColorPicker
class CP extends Component<Props> {
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    console.log(this.props, prevProps);
    // const { picker, circle, options } = this.props;
    // if (picker !== prevProps.picker || circle !== prevProps.circle) {
    //   this.props.changeOptions({ picker, circle });
    //   console.log('update');
    // }
  }

  render() {
    console.log('render');
    // if (!this.props.enable) return null;
    return <p>Test CP</p>;
  }
}
const mapStateToProps = ({ enable }) => ({});

const mapDispatchToProps = {
  addColor: Action.eventAddColor,
  change_enable: Action.event_change_enable,
  changeResize: Action.event_change_resize,
  changeOptions: Action.event_change_options,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CP);
