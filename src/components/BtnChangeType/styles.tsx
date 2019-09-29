import React from "react";
import styled from "styled-components";

export const StyleBtn = styled.button`
  border-radius: 3px;
  border: none;
  outline: none;
  text-align: center;
  color: #fff;
  font-family: "PTSansRegular";
  font-size: 14px;
  padding: 3px 7px 3px 7px;
  cursor: pointer;
  background-color: inherit;
  margin-right: 10px;
  background-color: ${({ active }) => (active ? "#3278b7" : "#3d4861ab")};
`;
