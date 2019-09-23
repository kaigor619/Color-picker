import React from "react";

export default function SaveWarning({ text, right, left, enable }) {
  if (enable == undefined) {
    enable = false;
  }
  if (!enable) return null;
  return (
    <div className="w_save_c_color" id="w_save_c_color">
      <div className="save_c_color">
        <p className="warning_lab_c_color">{text}</p>
        <div>
          <button
            className="descr_c_color btn_save_c_color"
            id="btn_save_c_color"
          >
            {left}
          </button>
          <button
            className="descr_c_color btn_del_c_color"
            id="btn_del_c_color"
          >
            {right}
          </button>
        </div>
      </div>
    </div>
  );
}
