import React, { Component } from 'react';
import Picker from '../Picker';
import { PresentColorLast, PresentColorOut } from '../PresentColor';
import { RegulateColor, RegulateOpacity } from '../Regulate';
import Model from '../Model';
import { connect } from 'react-redux';
import Colors from '../Colors';
import MainBtns from '../MainBtns';

// Style
import './styles.css';

// Interfaces
interface StateProps {
  enable: boolean;
}
type Props = StateProps;

// ColorPicker
class ColorPicker extends Component<Props> {
  componentDidCatch() {
    console.log('Color picker does not work');
  }

  render() {
    if (!this.props.enable) return null;
    return (
      <div>
        <div className="cp" id="cp">
          <Picker />

          <div className="cp_container">
            <div className="cp_settings">
              <div className="cp_presents-color">
                <PresentColorLast />
                <PresentColorOut />
              </div>

              <div className="cp_regulate-color ">
                <RegulateColor />
                <RegulateOpacity />
              </div>
            </div>

            <Model />
            <Colors />

            <MainBtns />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ enable }) => ({ enable });

export default connect(
  mapStateToProps,
  {},
)(ColorPicker);
