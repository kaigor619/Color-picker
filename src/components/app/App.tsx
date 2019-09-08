import React from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import { connect } from "react-redux";
import * as Action from "../../actions";

const App = function(options: any) {
  const demoClick = () => {
    options.add_color("#a32d9599");
  };
  return (
    <div>
      <div className="picker_demonstration">
        <div className="wrap_my_swatch">
          <div className="my_swatch_opacity"></div>
          <div className="my_swatch" onClick={demoClick}></div>
        </div>
        <input type="text" className="my_color_value" />
      </div>
      <ColorPicker />
    </div>
  );
};

const mapDispatchToProps = {
  add_color: Action.change_color
};

export default connect(
  null,
  mapDispatchToProps
)(App);
