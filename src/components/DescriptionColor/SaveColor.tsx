import React from "react";

const SaveColor = () => {
  return (
    <div className="w_save_c_color" id="w_save_c_color">
      <div className="save_c_color">
        <p className="warning_lab_c_color">Save color ?</p>
        <div>
          <button
            className="descr_c_color btn_save_c_color"
            id="btn_save_c_color"
          >
            Save
          </button>
          <button
            className="descr_c_color btn_del_c_color"
            id="btn_del_c_color"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveColor;
