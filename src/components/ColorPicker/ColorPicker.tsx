import React, { Component } from 'react';
import Picker from '../Picker';
import { PresentColorLast, PresentColorOut } from '../PresentColor';
import { RegulateColor, RegulateOpacity } from '../Regulate';
import BtnChangeType from '../BtnChangeType';
import { RgbInput, HslInput, HexInput } from '../InputColor';
import { connect } from 'react-redux';
import Colors from '../Colors';
import CopyColor from '../CopyColor';
import MainBtns from '../MainBtns';
import { Ifunctions, IColorsOptions } from '../../interfaces';
import * as Action from '../../actions';
import Checking from '../../options/checking';
import hotkeys from 'kai-hotkeys';
import { CSSTransition } from 'react-transition-group';

import './styles.css';

interface StateProps {
  enable: boolean;
}
interface DispatchProps {
  addColor: (options: IColorsOptions) => void;
  change_enable: (enable: boolean) => void;
}
interface OwnProps {
  options: IColorsOptions;
}
type Props = StateProps & DispatchProps & OwnProps;

class cp extends Component<Props> {
  componentDidMount() {
    hotkeys.add(
      'ctrl+alt+c',
      (event, handler) => {
        const { enable, change_enable } = this.props;
        if (enable) change_enable(false);
        else change_enable(true);
      },
      { pressingOnce: true },
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    let boolProps = false;
    let bool = false;
    const { options, enable } = nextProps;
    let { color: c, on: o } = this.props.options;
    let { color, on, syncColors, callCancel, callSave } = options;

    if (options == undefined) return false;
    if (color !== c || on !== o) {
      if (!on || on == undefined) return false;

      let a, b, c;

      if (Checking.check_arrFunctions(syncColors)) {
        a = syncColors;
      }
      if (Checking.check_arrFunctions(callCancel)) {
        b = callCancel;
      }
      if (Checking.check_arrFunctions(callSave)) {
        c = callSave;
      }
      color = String(color);
      let object: IColorsOptions = {
        color,
        syncColors: a,
        callCancel: b,
        callSave: c,
        on,
      };

      this.props.addColor(object);
    }
    if (this.props.enable !== enable) {
      bool = true;
    }

    return bool;
  }
  render() {
    if (!this.props.enable) return null;
    return (
      <div>
        <div className="cp" id="cp">
          <Picker width={250} height={140} />

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

            <div className="cp_models">
              <div className="cp_models-copy">
                <ul className="cp_list-models">
                  <RgbInput />
                  <HslInput />
                  <HexInput />
                </ul>
                <CopyColor />
              </div>
              <ul className="cp_list-type-color">
                <BtnChangeType name="hex" text="Hex" />
                <BtnChangeType name="rgb" text="Rgb" />
                <BtnChangeType name="hsl" text="Hsl" />
              </ul>
            </div>
            <Colors />

            <MainBtns />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ enable }) => ({ enable });

const mapDispatchToProps = {
  addColor: Action.eventAddColor,
  change_enable: Action.event_change_enable,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(cp);
