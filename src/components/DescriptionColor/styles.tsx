import React from "react";
import styled from "styled-components";

export const StyleDescriptionColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-top: 1px solid #ffffff3d;
  padding-top: 6px;
  padding-bottom: 6px;
  position: relative;
`;

export const DescriptionSwatch = styled.div`
  background-color: ${({ color }) => color};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 2px;
`;

export const WrapDescrPart = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapDescrOpacity = styled.div`
  background: url("../svg/opacity.svg") repeat;
  background-size: 50% 50%;
  position: relative;
  width: 17px;
  height: 17px;
  border-radius: 3px;
  cursor: pointer;
`;

export const InputDescr = styled.input`
  color: #fff;
  font-family: Arial;
  margin-left: 10px;
  font-size: 13px;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 3px 5px 3px 5px;
  outline: none;
  transition: 0.3s;
  max-width: 140px;
  background-color: transparent;
`;

const HoverImage = styled.img`
  :hover {
    opacity: 0.8;
    transition: 0.3s;
    cursor: pointer;
  }
`;

export const ImageEdit = styled(HoverImage)`
  margin-right: 15px;
  width: 14px;
  opacity: 0.5;
  height: auto;
  transition: 0.3s;
`;

export const ImageRemove = styled(HoverImage)`
  width: 16px;
  opacity: 0.5;
  transition: 0.3s;
  height: auto;
`;

export const StyleWrapWarning = styled.div`
  position: absolute;
  top: 104%;
  right: 0;
  width: 100%;
  padding: 5px 0 5px 0;
  background-color: #272f42;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ::before {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: #ffffff29;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
`;

export const StyleWarningLabel = styled.p`
  color: #ffffffad;
  font-size: 12px;
  font-family: "Arial";
`;

const BtnWarning = styled.button`
  color: #dae8ff;
  background-color: #303e5f;
  border-radius: 3px;
  padding: 3px 7px 3px 7px;
  border: none;
  font-family: Arial;
  cursor: pointer;
  transition: background-color 0.3s;
  :hover {
    background-color: #35698a;
    transition: background-color 0.3s;
  }
`;

export const BtnYes = styled(BtnWarning)`
  margin-right: 7px;
`;

export const BtnNo = styled(BtnWarning)``;
