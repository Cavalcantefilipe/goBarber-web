import React, { useCallback, useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { Container, Content, Background } from './styles';
import * as Yup from 'yup';
import validationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const SignIn: React.FC = () => {
  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState({});

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const onSubmit = useCallback(
    async data => {
      try {
        setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          let newErrors = validationErrors(err);
          setErrors(newErrors);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Faça seu logon</h1>

          <Input
            icon={FiMail}
            name="email"
            placeholder="E-mail"
            register={register}
            error={errors && errors}
          />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
            register={register}
            error={errors && errors}
          />
          <Button type="submit"> Entrar</Button>

          <a href="forgot"> Esqueci minha Senha </a>
        </form>

        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
