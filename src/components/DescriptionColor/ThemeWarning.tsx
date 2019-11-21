import React, { Component } from 'react';
import './styles.css';
import { CSSTransition } from 'react-transition-group';

interface OwnProps {
  on: boolean;
  options?: any;
}
type Props = OwnProps;
export default class ThemeWarning extends Component<Props> {
  render() {
    let { on } = this.props;
    let { options } = this.props;

    return (
      <CSSTransition in={on} timeout={300} classNames="warning" unmountOnExit>
        <div className="theme_warning">
          <p className="cp_descr-warning-text">{options.text}</p>
          <div>
            <button className="cp_descr-btns yes" onClick={options.funcYes}>
              {options.left}
            </button>
            <button className="cp_descr-btns no" onClick={options.funcNo}>
              {options.right}
            </button>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
