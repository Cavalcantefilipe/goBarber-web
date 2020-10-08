import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { ValidationRules, UseFormMethods } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Conteiner, Error } from './styles';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Partial<Pick<UseFormMethods, 'register'>> {
  rules?: ValidationRules;
  icon: React.ComponentType<IconBaseProps>;
  name: string;
  error?: any;
  containerStyle?: Object;
}

const Input: React.FC<InputProps> = ({
  name,
  rules = {},
  register,
  error,
  icon: Icon,
  containerStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback((input: HTMLInputElement) => {
    setIsFocused(false);
    setIsFilled(!!input?.value);
  }, []);

  return (
    <Conteiner
      style={containerStyle}
      isErrored={!!error[name]}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={({ target }) => handleInputBlur(target)}
        name={name}
        id={name}
        ref={register && register(rules)}
        {...rest}
      />
      {error[name] && (
        <Error title={error[name]}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Conteiner>
  );
};
export default Input;
