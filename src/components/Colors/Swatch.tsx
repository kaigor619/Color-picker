import React from 'react';

import './styles.css';

const Swatch = ({ color, name, handleClick, index }) => {
  const style = { backgroundColor: color };
  function handleClickSwatch() {
    handleClick(index);
  }
  return (
    <div className="cp_swatch-opacity">
      {/* 
  // @ts-ignore */}
      <div
        className="cp_swatch-color"
        style={style}
        name={name}
        onClick={handleClickSwatch}
      ></div>
    </div>
  );
};

export default Swatch;
