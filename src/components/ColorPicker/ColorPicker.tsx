import React, { Component } from "react";
import Picker from "../Picker/Picker";

class ColorPicker extends Component {
  render() {
    return (
      <div className="picker" id="picker">
        <Picker width={250} height={140} />
        <div className="picker_container">
          <div className="wrap_output_regulate">
            <div className="wrap_output_color">
              <div
                id="cover_last_color"
                className="cover_last_color color_cell"
              >
                <div id="last_color" className="last_color"></div>
              </div>

              <div id="cover_out_color" className="cover_out_color color_cell">
                <div id="out_color" className="out_color"></div>
              </div>
            </div>

            <div className="wrap_regulate_color">
              <div className="wrap_line_color line">
                <div id="ss_line" className="hue_color line_color"></div>
                <div className="picker_slider" id="line_circle"></div>
              </div>

              <div className="wrap_line_color opacity">
                <div className="opacity_color line_color" id="opacity_color">
                  <div className="linear_cover"></div>
                </div>
                <div className="picker_slider" id="opacity_circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
