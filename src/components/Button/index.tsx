import React, { ButtonHTMLAttributes } from 'react';
import { Conteiner } from './styles';

type ButtonsProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonsProps> = ({ children, ...rest }) => (
  <Conteiner type="button" {...rest}>
    {children}
  </Conteiner>
);
export default Button;
