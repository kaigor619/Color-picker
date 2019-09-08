import React, { Component } from "react";
import Picker from "../Picker/Picker";
import PresentColorLast from "../PresentColor/PresentColorLast";
import PresentColorOut from "../PresentColor/PresentColorOut";
import RegulateColor from "../Regulate/RegulateColor";
import RegulateOpacity from "../Regulate/RegulateOpacity";

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
        </div>
      </div>
    );
  }
}

export default ColorPicker;
