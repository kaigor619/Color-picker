import React from "react";
import { StyleWrapWarning, BtnYes, BtnNo, StyleWarningLabel } from "./styles";

const SaveColor = ({ onCancelColor, onSaveColor }) => {
  return (
    <StyleWrapWarning>
      <StyleWarningLabel>Save color ?</StyleWarningLabel>
      <div>
        <BtnYes onClick={onSaveColor}>Save</BtnYes>
        <BtnNo onClick={onCancelColor}>Cancel</BtnNo>
      </div>
    </StyleWrapWarning>
  );
};

export default SaveColor;
