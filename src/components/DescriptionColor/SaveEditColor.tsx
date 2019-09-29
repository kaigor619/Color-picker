import React from "react";
import { StyleWrapWarning, BtnYes, BtnNo, StyleWarningLabel } from "./styles";

const SaveEditColor = ({ onCancelEditColor, onSaveEditColor }) => {
  return (
    <StyleWrapWarning>
      <StyleWarningLabel>Save changes?</StyleWarningLabel>
      <div>
        <BtnYes onClick={onSaveEditColor}>Save</BtnYes>
        <BtnNo onClick={onCancelEditColor}>Cancel</BtnNo>
      </div>
    </StyleWrapWarning>
  );
};

export default SaveEditColor;
