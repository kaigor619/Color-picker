import React from "react";

const SaveEditColor = () => {
  return (
    <div className="w_descr_btns_save" id="w_descr_btns_save">
      <div className="descr_btns_save">
        <p className="warning_lab_c_color">Save changes?</p>
        <div>
          <button
            className="descr_save_c_color descr_c_color"
            id="descr_save_c_color"
          >
            Save
          </button>
          <button
            className="descr_cancel_c_color descr_c_color"
            id="descr_cancel_c_color"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveEditColor;
