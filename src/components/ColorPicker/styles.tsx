import React from "react";
import styled from "styled-components";

export const ColorPickerDiv = styled.div`
  position: absolute;
  margin: 0 auto;
  top: 10%;
  left: 40%;
  background-color: #272f42;
  border-radius: 3px;
  display: ${({ active }) => (active ? "block" : "none")};
`;

export const ColorPickerContainer = styled.div`
  padding: 0 10px 0 10px;
`;

export const ColorSettings = styled.div`
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const WrapPresentColors = styled.div`
  width: 70px;
`;

export const WrapRegulateColor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 15px;
`;

export const WrapListModelsInput = styled.div`
  display: flex;
  align-items: center;
`;

export const ListModelsInput = styled.ul`
  width: 100%;
`;

export const CopyColor = styled.div`
  position: relative;
  margin-left: 8px;
  padding: 4px;
  border-radius: 3px;
  width: 20px;
  cursor: pointer;

  img {
    max-width: 20px;
  }
`;

export const ListTypeColor = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const WrapMainBtns = styled.ul`
  display: flex;
  margin-bottom: 20px;
`;

const ThemeBtn = styled.button`
  color: #fff;
  border-radius: 11px;
  text-align: center;
  padding: 5px 25px 5px 25px;
  font-size: 13px;
  outline: none;
  cursor: pointer;
`;

export const BtnOk = styled(ThemeBtn)`
  background-color: rgb(50, 120, 183);
`;

export const BtnCancel = styled(ThemeBtn)`
  margin-left: 15px;
  background-color: rgba(56, 153, 236, 0.6);
`;
