import React from "react";
import styled from "styled-components";

export const WrapLineRegulate = styled.div`
  width: 100%;
  position: relative;
  height: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  :last-child {
    margin-bottom: 0;
  }
`;

const RegulateLine = styled.div`
  width: 100%;
  height: 12px;
  user-select: none;
  border-radius: 2px;
  position: relative;
`;

export const StyleRegulateColor = styled(RegulateLine)`
  background: linear-gradient(
    to left,
    #f00 0%,
    #ff0 16%,
    #0f0 33%,
    #0ff 50%,
    #00f 66%,
    #f0f 83%,
    #f00 100%
  );
`;

export const StyleRegulateOpacity = styled(RegulateLine)`
  background: url("../svg/opacity.svg");
`;

export const LinearOpacity = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #000);
`;

export const RegulateCircle = styled.div`
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  transform: translateY(-50%) translateX(-50%);
  position: absolute;
  top: 50%;
  left: ${({ left }) => left};
  cursor: pointer;
`;
