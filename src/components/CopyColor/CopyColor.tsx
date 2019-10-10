import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CopyColorStyle } from './styles';
import copy from 'copy-text-to-clipboard';
import Model from '../../options/modelsColor';

interface StateProps {
  model: string | number[];
  type: string;
  opacity: number;
}

type Props = StateProps;

export class CopyColor extends Component<Props> {
  handleClick(e) {
    let { model, type, opacity } = this.props;

    let value = Model[type].getString(model, opacity);
    copy(value);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <CopyColorStyle onClick={this.handleClick.bind(this)}>
        <img
          src="svg/copy.svg"
          className="copy-color"
          id="copy-color"
          alt="Copy color"
        />
      </CopyColorStyle>
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
