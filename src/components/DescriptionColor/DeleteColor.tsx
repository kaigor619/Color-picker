import React from "react";
import { StyleWrapWarning, BtnYes, BtnNo, StyleWarningLabel } from "./styles";

const DeleteColor = ({ onYesDeleteColor, onNoDeleteColor }) => {
  return (
    <StyleWrapWarning>
      <StyleWarningLabel>Delete this swatch?</StyleWarningLabel>
      <div>
        <BtnYes onClick={onYesDeleteColor}>Yes</BtnYes>
        <BtnNo onClick={onNoDeleteColor}>No</BtnNo>
      </div>
    </StyleWrapWarning>
  );
};

export default DeleteColor;
