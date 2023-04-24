import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { HeaderContainer } from './styled';
import { Context } from '../../context/UserContext';

import Logo from '../../assets/img/logotipo.png';

export default function Header() {
  const { authenticated, logout } = useContext(Context);

  return (
    <HeaderContainer>
      <h1>
        <img src={Logo} alt="Logotipo" width="50px" /> AdopterPet
      </h1>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pets/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/pets/myadoptions">Minhas Adoções</Link>
            </li>
            <li>
              <Link to="/users/profile">Perfil</Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                Sair
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </HeaderContainer>
  );
}
