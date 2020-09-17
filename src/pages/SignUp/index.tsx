import React, { useCallback, useState } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import validationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(async (data: object) => {
    try {
      setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 dígitos'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      let newErrors = validationErrors(err);
      setErrors(newErrors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Faça seu cadastro</h1>

          <Input
            name="name"
            type="text"
            icon={FiUser}
            register={register}
            placeholder="Nome"
            error={errors && errors}
          />
          <Input
            icon={FiMail}
            name="email"
            type="text"
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
          <Button type="submit"> Cadastrar</Button>

          <a href="forgot"> Esqueci minha Senha </a>
        </form>

        <a href="login">
          <FiArrowLeft />
          Voltar para login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
