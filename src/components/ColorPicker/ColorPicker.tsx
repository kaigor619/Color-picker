import React, { Component } from "react";
import Picker from "../Picker";
import { PresentColorLast, PresentColorOut } from "../PresentColor";
import { RegulateColor, RegulateOpacity } from "../Regulate";
import BtnChangeType from "../BtnChangeType";
import { RgbInput, HslInput, HexInput } from "../InputColor";
import Colors from "../Colors";
import {
  ColorPickerDiv,
  ColorPickerContainer,
  ColorSettings,
  WrapPresentColors,
  WrapRegulateColor,
  WrapListModelsInput,
  ListModelsInput,
  CopyColor,
  ListTypeColor,
  BtnOk,
  BtnCancel,
  WrapMainBtns
} from "./styles";

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
              <CopyColor className="copy-color" name-custom="Copied">
                <img
                  src="svg/copy.svg"
                  className="copy-color"
                  id="copy-color"
                  alt="Copy color"
                />
              </CopyColor>
            </WrapListModelsInput>
            <ListTypeColor className="list-type-color">
              <BtnChangeType name="hex" text="Hex" />
              <BtnChangeType name="rgb" text="Rgb" />
              <BtnChangeType name="hsl" text="Hsl" />
            </ListTypeColor>
          </div>
          {/* <Colors /> */}

          <WrapMainBtns>
            <BtnOk className="btn_color_ok" id="btn_color_ok">
              Ok
            </BtnOk>
            <BtnCancel className="btn_color_cancel" id="btn_color_cancel">
              Cancel
            </BtnCancel>
          </WrapMainBtns>
        </ColorPickerContainer>
      </ColorPickerDiv>
    );
  }
}

export default ColorPicker;
