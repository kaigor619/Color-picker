import React, { Component } from 'react';
import Picker from '../Picker';
import { PresentColorLast, PresentColorOut } from '../PresentColor';
import { RegulateColor, RegulateOpacity } from '../Regulate';
import Model from '../Model';
import { connect } from 'react-redux';
import Colors from '../Colors';
import MainBtns from '../MainBtns';
import {
  IColorsOptions,
  IOptions,
  Icolors,
  IColorsOnInput,
} from '../../interfaces';
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
  changeOptions: (options: IOptions) => void;
  changeColors: (colors: Icolors[]) => void;
}
interface OwnProps {
  on: boolean;
  color?: string;
  options?: IColorsOnInput;
  style_options?: IOptions;
  colors?: Icolors[];
}
type Props = StateProps & DispatchProps & OwnProps;

// ColorPicker
class ColorPicker extends Component<Props> {
  update() {
    const { style_options, options, on, color, colors } = this.props;

    if (style_options) {
      this.props.changeOptions(style_options);
    }
    if (options && on) {
      this.check_sending(color, options);
    }
    if (colors) {
      this.props.changeColors(colors);
    }
  }
  check_sending(color, options) {
    let a, b, c, d;
    a = Checking.check_arrFunctions(options.syncColors)
      ? options.syncColors
      : a;
    b = Checking.check_arrFunctions(options.callCancel)
      ? options.callCancel
      : b;
    c = Checking.check_arrFunctions(options.callSave) ? options.callSave : c;
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
  UNSAFE_componentWillMount() {
    this.update();
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
    let bool = false;
    const { style_options, colors, enable } = this.props;
    const { options, enable: enb, on, colors: cls, color } = nextProps;

    if (style_options !== nextProps.style_options) {
      this.props.changeOptions(nextProps.style_options);
    }
    if (enable !== enb) {
      return true;
    }
    if (!on) return false;

    if (options !== undefined) {
      if (color) {
        this.check_sending(color, options);
      }
    }
    if (colors !== cls) {
      this.props.changeColors(cls);
    }

    return bool;
  }

  render() {
    if (!this.props.enable) return null;
    return (
      <React.StrictMode>
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
      </React.StrictMode>
    );
  }
}
const mapStateToProps = ({ enable }) => ({ enable });

const mapDispatchToProps = {
  addColor: Action.eventAddColor,
  changeEnable: Action.event_change_enable,
  changeOptions: Action.event_change_options,
  changeColors: Action.event_change_colors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorPicker);
