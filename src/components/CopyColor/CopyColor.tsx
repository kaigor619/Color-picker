import React, { Component, useState } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import copy from 'copy-text-to-clipboard';
import Model from '../../options/modelsColor';
import classNames from 'classnames';
import './styles.css';

function CopyColor({ store }) {
  let [copied, setCopied] = useState(false);

  function handleClick() {
    const { models, type, opacity } = store.getState();
    let color = Model[type].getString(models[type], opacity);

    let bool = copy(color);
    if (bool) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  let elemClass = classNames('cp_copy-color', { active: copied });
  return (
    <React.Fragment>
      {/* 
      // @ts-ignore */}
      <div className={elemClass} name="Copied" onClick={() => handleClick()}>
        <img
          src="svg/copy.svg"
          className="copy-color"
          id="copy-color"
          alt="Copy color"
        />
      </div>
    </React.Fragment>
  );
}

function CopyWrapper() {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return <CopyColor store={store} />;
      }}
    </ReactReduxContext.Consumer>
  );
}

export default CopyWrapper;
