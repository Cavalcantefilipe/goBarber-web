import React, { ChangeEvent, useCallback, useState } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { Link, useHistory } from 'react-router-dom';
import validationErrors from '../../utils/getValidationErrors';
import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { handleSubmit, register } = useForm();
  const { user, updateUser } = useAuth();
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();
  const history = useHistory();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const onSubmit = useCallback(
    async data => {
      try {
        setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required(),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required(),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = Object.assign(
          {
            name: data.name,
            email: data.email,
          },
          data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
              }
            : {},
        );

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil Atualizado!',
          description: 'Suas Informações foram atualizadas com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          let newErrors = validationErrors(err);
          setErrors(newErrors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na Atualização',
          description:
            'Ocorreu um erro na atualização do Perfil,tente novamente',
        });
      }
    },
    [history, addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AvatarInput>
            <img src={user.avatar_url} alt="" />

            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>
          <Input
            name="name"
            type="text"
            icon={FiUser}
            register={register}
            placeholder="Nome"
            error={errors && errors}
            defaultValue={user.name}
          />
          <Input
            icon={FiMail}
            name="email"
            type="text"
            placeholder="E-mail"
            register={register}
            error={errors && errors}
            defaultValue={user.email}
          />
          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            name="old_password"
            placeholder="Senha atual"
            type="password"
            register={register}
            error={errors && errors}
          />
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
            placeholder="Confirmar senha"
            type="password"
            register={register}
            error={errors && errors}
          />
          <Button type="submit">Atualizar Cadastro</Button>
        </form>
      </Content>
    </Container>
  );
};

export default Profile;
