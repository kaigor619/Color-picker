import styled from 'styled-components';

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
