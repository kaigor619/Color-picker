import React from "react";
import ColorPicker from "../ColorPicker";
import { connect } from "react-redux";
import * as Action from "../../actions";

const App = function({ add_color }) {
  const demoClick = () => {
    add_color("#a32d9587");
  };
  const color = "#a32d9587";
  return (
    <div>
      <div className="picker_demonstration">
        <div className="wrap_my_swatch">
          <div className="my_swatch_opacity"></div>
          <div
            className="my_swatch"
            onClick={demoClick}
            style={{ backgroundColor: color }}
          ></div>
        </div>
        <input type="text" className="my_color_value" />
      </div>
      <ColorPicker />
    </div>
  );
};

const mapDispatchToProps = {
  add_color: Action.addColor
};

export default connect(
  null,
  mapDispatchToProps
)(App);
