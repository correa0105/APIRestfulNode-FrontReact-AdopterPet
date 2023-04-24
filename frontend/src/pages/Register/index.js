import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../context/UserContext';

import { Container } from '../../styles/GlobalStyles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Title from '../../components/Title';

import { Form } from './styled';

export default function Register() {
  const [user, setUser] = useState({});

  const { register } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(user);
  }

  return (
    <Container>
      <Title text="Registre-se" />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input text="Nome" idInput="name" name="name" onChange={(e) => handleChange(e)} type="text" placeholder="Digite seu nome" />
        <Input
          text="Email"
          idInput="email"
          name="email"
          onChange={(e) => handleChange(e)}
          type="email"
          placeholder="Digite seu email"
        />
        <Input
          text="Telefone"
          idInput="phone"
          name="phone"
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
        <Button type="submit" text="Cadastrar" />
        <p>
          Ja possui acesso? <Link to="/login">Clique aqui!</Link>
        </p>
      </Form>
    </Container>
  );
}
