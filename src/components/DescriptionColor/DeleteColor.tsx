import React from "react";

const DeleteColor = () => {
  return (
    <div className="w_warning_delete" id="w_warning_delete">
      <div className="warning_delete">
        <p className="warning_lab_c_color">Delete this swatch?</p>
        <div>
          <button
            className="descr_c_color descr_del_color"
            id="descr_del_color"
          >
            Yes
          </button>
          <button
            className="descr_c_color descr_del_c_color"
            id="descr_del_c_color"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteColor;
