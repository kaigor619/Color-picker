import React from "react";
import styled from "styled-components";

const SwatchColor = styled.div`
  background-color: ${props => props.color};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 2px;

  ::before {
    position: absolute;
    opacity: 0;
    z-index: 1000000;
    pointer-events: none;
    content: "";
    left: 47%;
    top: -8px;
    transform: translateX(-50%);
    background: transparent;
    border: 6px solid transparent;
    border-top-color: #38486d;
    z-index: 1000001;
  }

  ::after {
    position: absolute;
    opacity: 0;
    z-index: 1000000;
    pointer-events: none;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translate(-50%, 0);
    background: #38486d;
    border-radius: 3px;
    color: white;
    padding: 7px 8px;
    font-size: 12px;
    font-family: Arial, sans-serif;
    line-height: 11px;
    white-space: nowrap;
    content: "${props => props.name}";
  }

  :hover:before,
  :hover:after {
    opacity: 1;
  }
`;

const OpacitySwatch = styled.div`
  background: url("../svg/opacity.svg") repeat;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
`;

const Swatch = ({ color, name, handleClick, index }) => {
  return (
    <OpacitySwatch>
      <SwatchColor
        color={color}
        name={name}
        onClick={() => {
          handleClick(index);
        }}
      />
    </OpacitySwatch>
  );
};

export default Swatch;
