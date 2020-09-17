import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ConteinerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Conteiner = styled.div<ConteinerProps>`
  display: flex;
  width: 100%;
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  border: 2px solid #232129;
  color: #666360;
  svg {
    margin-right: 16px;
  }
  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;
  }
  &::placeholder {
    color: #666360;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  & + div {
    margin-top: 8px;
  }
`;

export const Error = styled(Tooltip)`
  svg {
    margin: 0;
    margin-left: 16px;
  }
  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030;
    }
  }
`;
