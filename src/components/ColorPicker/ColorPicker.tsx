import React, { Component } from "react";
import Picker from "../Picker/Picker";
import PresentColorLast from "../PresentColor/PresentColorLast";
import PresentColorOut from "../PresentColor/PresentColorOut";
import RegulateColor from "../Regulate/RegulateColor";
import RegulateOpacity from "../Regulate/RegulateOpacity";
import BtnChangeType from "../BtnChangeType/BtnChangeType";
import RgbInput from "../InputColor/RgbInput";
import TestInput from "../TestInput";

class ColorPicker extends Component {
  render() {
    return (
      <div className="picker" id="picker">
        <Picker width={250} height={140} />

        <div className="picker_container">
          <div className="wrap_output_regulate">
            <div className="wrap_output_color">
              <PresentColorLast />
              <PresentColorOut />
            </div>

            <div className="wrap_regulate_color">
              <RegulateColor />
              <RegulateOpacity />
            </div>
          </div>

          <div className="wrap_val_all_color">
            <div className="w_copy_input">
              <ul className="list_type_val_color">
                <RgbInput />
                {/* <TestInput /> */}
              </ul>
              <div className="w_copy_color hint--top" name-custom="Copied">
                <img
                  src="svg/copy.svg"
                  className="copy_color"
                  id="copy_color"
                  alt="Copy model color"
                />
              </div>
            </div>
            <ul className="list_select_type_color">
              <BtnChangeType name="hex" text="Hex" />
              <BtnChangeType name="rgb" text="Rgb" />
              <BtnChangeType name="hsl" text="Hsl" />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
