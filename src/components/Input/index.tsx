import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Conteiner } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Conteiner>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Conteiner>
);
export default Input;
