import React, { Component } from 'react';
import './styles.css';

interface OwnProps {
  text: string;
  funcYes: () => void;
  funcNo: () => void;
  right: string;
  left: string;
}
type Props = OwnProps;
export default class ThemeWarning extends Component<Props> {
  render() {
    let { text, funcYes, funcNo, right, left } = this.props;

    return (
      <div className="theme_warning">
        <p className="cp_descr-warning-text">{text}</p>
        <div>
          <button className="cp_descr-btns yes" onClick={funcYes}>
            {left}
          </button>
          <button className="cp_descr-btns no" onClick={funcNo}>
            {right}
          </button>
        </div>
      </div>
    );
  }
}
