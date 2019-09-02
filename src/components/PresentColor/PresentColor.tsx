import React from "react";
type Obj = { name: string };

const PresentColor = (props: Obj) => {
  const name: string = props.name;
  return (
    <div className="color_cell">
      <div id={name} className={"present_color " + name}></div>
    </div>
  );
};

export default PresentColor;
