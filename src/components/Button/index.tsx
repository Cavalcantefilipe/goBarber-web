import React, { ButtonHTMLAttributes } from 'react';
import { Conteiner } from './styles';

type ButtonsProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonsProps> = ({ children, loading, ...rest }) => (
  <Conteiner type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Conteiner>
);
export default Button;
