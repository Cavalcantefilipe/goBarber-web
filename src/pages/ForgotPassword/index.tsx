import React, { useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import validationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState({});

  const { addToast } = useToast();

  const onSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description: 'Enviamo um e-mail para confirmar a troca da sua senha',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          let newErrors = validationErrors(err);
          setErrors(newErrors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na Recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Recuperar senha</h1>

            <Input
              icon={FiMail}
              name="email"
              placeholder="E-mail"
              register={register}
              error={errors && errors}
            />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </form>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
