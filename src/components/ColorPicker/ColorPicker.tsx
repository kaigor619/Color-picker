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
  change_enable: (enable: boolean) => void;
  changeResize: () => void;
  changeOptions: (options: IOptions) => void;
}
interface OwnProps {
  options: IColorsOptions;
  style_options: IOptions;
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
    const { style_options, options } = this.props;
    let { syncColors, callCancel, callSave, color, on } = options;

    if (style_options) {
      this.props.changeOptions(style_options);
    }
    if (options && on) {
      let a, b, c;
      a = Checking.check_arrFunctions(syncColors) ? syncColors : a;
      b = Checking.check_arrFunctions(callCancel) ? callCancel : b;
      c = Checking.check_arrFunctions(callSave) ? callSave : c;

      let object: IColorsOptions = {
        color,
        syncColors: a,
        callCancel: b,
        callSave: c,
        on,
      };

      this.props.addColor(object);
    }
  }

  componentDidMount() {
    // kai-hotkeys
    hotkeys.add(
      'ctrl+alt+c',
      (event, handler) => {
        const { enable, change_enable } = this.props;
        change_enable(!enable);
      },
      { pressingOnce: true },
    );
  }

  componentDidCatch() {
    console.log('Color picker does not work');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('should', this.props.enable, nextProps.enable);

    let bool = false;
    const { style_options } = this.props;
    const { options, enable } = nextProps;
    let { color, on, syncColors, callCancel, callSave } = options;
    let { color: c, on: o } = this.props.options;

    if (this.props.enable !== enable) {
      return true;
    }
    if (options !== undefined) {
      if (color || on) {
        if (!on || on === undefined) return false;

        let a, b, c;
        a = Checking.check_arrFunctions(syncColors) ? syncColors : a;
        b = Checking.check_arrFunctions(callCancel) ? callCancel : b;
        c = Checking.check_arrFunctions(callSave) ? callSave : c;
        let object: IColorsOptions = {
          color,
          syncColors: a,
          callCancel: b,
          callSave: c,
          on,
        };

        this.props.addColor(object);
        bool = true;
      }
    }
    if (style_options !== nextProps.style_options) {
      this.props.changeOptions(nextProps.style_options);
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
  change_enable: Action.event_change_enable,
  changeResize: Action.event_change_resize,
  changeOptions: Action.event_change_options,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorPicker);
