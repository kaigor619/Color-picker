import React from 'react';
import styled from 'styled-components';

export const ColorPickerDiv = styled.div`
  position: absolute;
  margin: 0 auto;
  top: 10%;
  left: 40%;
  background-color: #272f42;
  border-radius: 3px;
  display: ${({ active }) => (active ? 'block' : 'none')};
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

export const ListTypeColor = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
