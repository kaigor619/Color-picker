import React from 'react';

import './styles.css';

const Swatch = ({ color, name, handleClick, index }) => {
  const style = { backgroundColor: color };
  return (
    <div className="cp_swatch-opacity">
      {/* 
  // @ts-ignore */}
      <div
        className="cp_swatch-color"
        style={style}
        name={name}
        onClick={() => {
          handleClick(index);
        }}
      ></div>
    </div>
  );
};

export default Swatch;
