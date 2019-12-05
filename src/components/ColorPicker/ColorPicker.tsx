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
import { IColorsOptions, IOptions } from '../../interfaces';
import * as Action from '../../actions';
import Checking from '../../options/checking';
import hotkeys from 'kai-hotkeys';

// Style
import './styles.css';

// Interfaces
interface StateProps {
  enable: boolean;
}
interface DispatchProps {
  addColor: (options: IColorsOptions) => void;
  changeEnable: (enable: boolean) => void;
  changeResize: () => void;
  changeOptions: (options: IOptions) => void;
}
interface OwnProps {
  options: IColorsOptions;
  style_options?: IOptions;
  on: boolean;
}
type Props = StateProps & DispatchProps & OwnProps;

// ColorPicker
class ColorPicker extends Component<Props> {
  constructor(props) {
    super(props);
    window.addEventListener('resize', () => {
      this.props.changeResize();
    });
  }
  componentWillMount() {
    const { style_options, options, on } = this.props;
    let { syncColors, callCancel, callSave, color } = options;

    if (style_options) {
      this.props.changeOptions(style_options);
    }
    if (options && on) {
      let a, b, c, d;
      a = Checking.check_arrFunctions(syncColors) ? syncColors : a;
      b = Checking.check_arrFunctions(callCancel) ? callCancel : b;
      c = Checking.check_arrFunctions(callSave) ? callSave : c;
      d = color && typeof color == 'string' ? color : d;

      let object: IColorsOptions = {
        color: d,
        syncColors: a,
        callCancel: b,
        callSave: c,
      };

      if (!a && !b && !c && !d) this.props.changeEnable(true);
      else this.props.addColor(object);
    }
  }

  componentDidMount() {
    // kai-hotkeys
    hotkeys.add(
      'ctrl+alt+c',
      (event, handler) => {
        const { enable, changeEnable } = this.props;
        changeEnable(!enable);
      },
      { pressingOnce: true },
    );
  }

  componentDidCatch() {
    console.log('Color picker does not work');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // debugger;
    let bool = false;
    const { style_options } = this.props;
    const { options, enable, on } = nextProps;
    let { color, syncColors, callCancel, callSave } = options;

    if (style_options !== nextProps.style_options) {
      this.props.changeOptions(nextProps.style_options);
    }
    if (this.props.enable !== enable) {
      return true;
    }
    if (!on) return false;

    if (options !== undefined) {
      if (color) {
        let a, b, c, d;
        a = Checking.check_arrFunctions(syncColors) ? syncColors : a;
        b = Checking.check_arrFunctions(callCancel) ? callCancel : b;
        c = Checking.check_arrFunctions(callSave) ? callSave : c;
        d = color && typeof color == 'string' ? color : d;

        let object: IColorsOptions = {
          color: d,
          syncColors: a,
          callCancel: b,
          callSave: c,
        };

        if (!a && !b && !c && !d) this.props.changeEnable(true);
        else this.props.addColor(object);
      }
    }

    return bool;
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
  changeEnable: Action.event_change_enable,
  changeResize: Action.event_change_resize,
  changeOptions: Action.event_change_options,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorPicker);
