import React from "react";
import styled from "styled-components";

export const WrapColorInputs = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputColor = styled.input`
  display: block;
  max-width: 40px;
  border-radius: 3px;
  border: none;
  outline: none;
  text-align: center;
  color: #000;
  font-family: "PTSansRegular";
  font-size: 13px;
  padding: 3px 0 3px 0;
`;

export const HexInput = styled(InputColor)`
  width: 100%;
  max-width: none;
`;
