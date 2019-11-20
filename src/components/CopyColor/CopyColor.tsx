import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-text-to-clipboard';
import Model from '../../options/modelsColor';

import './styles.css';

interface StateProps {
  model: string | number[];
  type: string;
  opacity: number;
}

type Props = StateProps;

export class CopyColor extends Component<Props> {
  state = {
    copied: false,
  };
  handleClick(e) {
    let { model, type, opacity } = this.props;

    let value = Model[type].getString(model, opacity);
    let bool = copy(value);
    if (bool) {
      this.setState({ copied: true });
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    }
  }
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { copied } = this.state;
    let classNames = 'cp_copy-color';
    if (copied) classNames += ' active';

    return (
      <React.Fragment>
        {/* 
  // @ts-ignore */}
        <div
          className={classNames}
          name="Copied"
          onClick={this.handleClick.bind(this)}
        >
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
}

const mapStateToProps = ({ models, type, opacity }) => ({
  model: models[type],
  type,
  opacity,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyColor);
