import React from "react";
import styled from "styled-components";

export const StyleCustomColors = styled.div`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, 17px);
  grid-auto-rows: 17px;
  grid-column-gap: 6.5px;
  grid-row-gap: 10px;
  margin-bottom: 20px;
`;

export const StyleAddColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  cursor: pointer;

  :hover img {
    opacity: 1;
    transition: opacity 0.3s;
  }
`;
