import React from "react";

interface ItestInputCell {
  value: number;
  hex?: boolean;
  maxLength: number;
  handleChange: () => void;
}

const TestInputCell = ({
  value,
  handleChange,
  hex,
  maxLength
}: ItestInputCell) => {
  let classNames = "input_text_value";
  if (hex) classNames = "hex_text_value";
  return (
    <input
      type="text"
      maxLength={maxLength}
      value={value}
      onChange={handleChange}
      className={classNames}
    />
  );
};

export default TestInputCell;
