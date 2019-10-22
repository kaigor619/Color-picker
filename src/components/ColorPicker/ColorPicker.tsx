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
import {
  ColorPickerDiv,
  ColorPickerContainer,
  ColorSettings,
  WrapPresentColors,
  WrapRegulateColor,
  WrapListModelsInput,
  ListModelsInput,
  ListTypeColor,
} from './styles';

interface StateProps {
  enable: boolean;
}
interface DispatchProps {
  addColor: (options: IColorsOptions) => void;
}
interface OwnProps {
  options: IColorsOptions;
}
type Props = StateProps & DispatchProps & OwnProps;

class ColorPicker extends Component<Props> {
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
      <ColorPickerDiv
        active={true}
        className="kai-color-picker"
        id="kai-color-picker"
      >
        <Picker width={250} height={140} />

        <ColorPickerContainer className="colorpicker-container">
          <ColorSettings className="color-setting">
            <WrapPresentColors className="wrap-presents-color">
              <PresentColorLast />
              <PresentColorOut />
            </WrapPresentColors>

            <WrapRegulateColor className="wrap-regulate-color">
              <RegulateColor />
              <RegulateOpacity />
            </WrapRegulateColor>
          </ColorSettings>

          <div className="wrap-models-color">
            <WrapListModelsInput>
              <ListModelsInput>
                <RgbInput />
                <HslInput />
                <HexInput />
              </ListModelsInput>
              <CopyColor />
            </WrapListModelsInput>
            <ListTypeColor className="list-type-color">
              <BtnChangeType name="hex" text="Hex" />
              <BtnChangeType name="rgb" text="Rgb" />
              <BtnChangeType name="hsl" text="Hsl" />
            </ListTypeColor>
          </div>
          <Colors />

          <MainBtns />
        </ColorPickerContainer>
      </ColorPickerDiv>
    );
  }
}
const mapStateToProps = ({ enable }) => ({ enable });

const mapDispatchToProps = {
  addColor: Action.eventAddColor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorPicker);
