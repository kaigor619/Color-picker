import React, { Component } from 'react';
import BtnChangeType from '../BtnChangeType';
import CopyColor from '../CopyColor';
import store from '../../store/store';
import Models from '../Models';

export class Model extends Component {
  buttons;
  UNSAFE_componentWillMount() {
    const { models } = store.getState();
    let keys = Object.keys(models);
    this.buttons = keys.map(name => {
      let text = name.charAt(0).toUpperCase() + name.slice(1);
      return <BtnChangeType key={name} {...{ text, name }} />;
    });
  }
  render() {
    return (
      <div className="cp_models">
        <div className="cp_models-copy">
          <ul className="cp_list-models">
            <Models />
          </ul>
          <CopyColor />
        </div>
        <ul className="cp_list-type-color">{this.buttons}</ul>
      </div>
    );
  }
}

export default Model;
