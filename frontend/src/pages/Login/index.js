import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../context/UserContext';

import { Container } from '../../styles/GlobalStyles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Title from '../../components/Title';

import { Form } from './styled';

export default function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <Container>
      <Title text="Entre!" />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          text="Email"
          idInput="email"
          name="email"
          onChange={(e) => handleChange(e)}
          type="email"
          placeholder="Digite seu email"
        />
        <Input
          text="Senha"
          idInput="password"
          name="password"
          onChange={(e) => handleChange(e)}
          type="password"
          placeholder="Digite sua senha"
        />
        <Button type="submit" text="Entre" />
        <p>
          Não possui acesso? <Link to="/register">Clique aqui!</Link>
        </p>
      </Form>
    </Container>
  );
}
