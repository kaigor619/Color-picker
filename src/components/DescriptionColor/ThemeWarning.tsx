import React, { Component } from 'react';
import './styles.css';
import { CSSTransition } from 'react-transition-group';

interface OwnProps {
  on: boolean;
  options?: any;
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
    let { on } = this.props;
    // if (!on) return null;
    let { text, left, right, funcNo, funcYes } = this.props.options;

    // let classNames = active ? 'theme_warning active' : 'theme_warning';
    return (
      <CSSTransition in={on} timeout={300} classNames="example" unmountOnExit>
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
      </CSSTransition>
    );
  }
}
