import React, { Component } from 'react';
import { StyleWrapWarning, BtnYes, BtnNo, StyleWarningLabel } from './styles';
import './style.css';

interface OwnProps {
  text: string;
  left: string;
  right: string;
  funcNo: () => void;
  funcYes: () => void;
}
type Props = OwnProps;
export default class ThemeWarning extends Component<Props> {
  state = {
    active: true,
  };
  componentDidMount() {
    // this.setState({ active: true });
  }
  render() {
    let { text, left, right, funcNo, funcYes } = this.props;
    let { active } = this.state;
    let classNames = active ? 'theme_warning active' : 'theme_warning';
    return (
      <StyleWrapWarning className={classNames}>
        <StyleWarningLabel>{text}</StyleWarningLabel>
        <div>
          <BtnYes onClick={funcYes}>{left}</BtnYes>
          <BtnNo onClick={funcNo}>{right}</BtnNo>
        </div>
      </StyleWrapWarning>
    );
  }
}
