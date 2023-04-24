import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../../utils/api';

import { Container } from '../../styles/GlobalStyles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Title from '../../components/Title';
import RoundedImg from '../../components/RoundedImg';

import { Form, ContainerImg } from './styled';

export default function Profile() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState('');
  const [token] = useState(localStorage.getItem('token') || '');

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Dados editados com sucesso!');
        return response.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  useEffect(() => {
    api
      .get('/users/checkUser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  return (
    <Container>
      <Title text="Editar" />
      <ContainerImg>
        {(user.image || preview) && (
          <RoundedImg
            src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API_URL}/images/users/${user.image}`}
            alt="Imagem de Perfil"
          />
        )}
        <h2>{user.name}</h2>
      </ContainerImg>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          text="Imagem"
          idInput="image"
          name="image"
          onChange={(e) => handleFileChange(e)}
          type="file"
          placeholder="Digite seu nome"
        />
        <Input
          text="Nome"
          idInput="name"
          name="name"
          value={user.name || ''}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Digite seu nome"
        />
        <Input
          text="Email"
          idInput="email"
          name="email"
          value={user.email || ''}
          onChange={(e) => handleChange(e)}
          type="email"
          placeholder="Digite seu email"
        />
        <Input
          text="Telefone"
          idInput="phone"
          name="phone"
          value={user.phone || ''}
          onChange={(e) => handleChange(e)}
          type="tel"
          placeholder="Digite seu telefone"
        />
        <Input
          text="Senha"
          idInput="password"
          name="password"
          onChange={(e) => handleChange(e)}
          type="password"
          placeholder="Digite sua senha"
        />
        <Input
          text="Re-Senha"
          idInput="confirmpassword"
          name="confirmpassword"
          onChange={(e) => handleChange(e)}
          type="password"
          placeholder="Repita sua senha"
        />
        <Button type="submit" text="Salvar" />
      </Form>
    </Container>
  );
}
