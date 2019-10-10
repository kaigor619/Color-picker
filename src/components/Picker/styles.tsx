import React from 'react';
import styled from 'styled-components';

export const BlockPicker = styled.div`
  user-select: none;
  border-radius: 3px;
  position: relative;
`;

export const BlockCircle = styled.div`
  border: 2px solid #fff;
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 5px #7f7f7f;
  transform: translate(-50%, -50%);
  user-select: none;
`;
