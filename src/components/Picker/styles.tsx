import React from "react";
import styled from "styled-components";

export const BlockPicker = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  user-select: none;
  border-radius: 3px;
  position: relative;
  background: ${({ background }) => background};
`;

export const BlockCircle = styled.div`
  border: 2px solid #fff;
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 5px #7f7f7f;
  transform: translate(-50%, -50%);
  cursor: pointer;
  user-select: none;
`;
