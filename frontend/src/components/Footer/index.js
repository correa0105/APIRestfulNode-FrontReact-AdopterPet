import React from 'react';

import { FooterContainer } from './styled';

import Logo from '../../assets/img/logotipo.png';

export default function Footer() {
  return (
    <FooterContainer>
      <p>Todos direitos reservados ©AdopterPet</p>
      <h1>
        <img src={Logo} alt="Logotipo" width="35px" />
      </h1>
    </FooterContainer>
  );
}
