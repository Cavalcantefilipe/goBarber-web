import React, { useCallback, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import validationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

const ResetPassword: React.FC = () => {
  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { addToast } = useToast();
  const location = useLocation();
  const onSubmit = useCallback(
    async data => {
      try {
        setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await schema.validate(data, { abortEarly: false });

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          let newErrors = validationErrors(err);
          setErrors(newErrors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha,tente novamente',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              placeholder="Nova Senha"
              type="password"
              register={register}
              error={errors && errors}
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              placeholder="Confirmação da Senha"
              type="password"
              register={register}
              error={errors && errors}
            />
            <Button type="submit"> Alterar Senha</Button>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
