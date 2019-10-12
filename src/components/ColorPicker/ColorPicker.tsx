import React, { Component } from 'react';
import Picker from '../Picker';
import { PresentColorLast, PresentColorOut } from '../PresentColor';
import { RegulateColor, RegulateOpacity } from '../Regulate';
import BtnChangeType from '../BtnChangeType';
import { RgbInput, HslInput, HexInput } from '../InputColor';
import Colors from '../Colors';
import CopyColor from '../CopyColor';
import MainBtns from '../MainBtns';
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

class ColorPicker extends Component {
  render() {
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

export default ColorPicker;
