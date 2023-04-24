import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import api from '../../utils/api';

import { Container } from '../../styles/GlobalStyles';
import Title from '../../components/Title';

import { ImageContainer, ContainerDetails } from './styled';
import Button from '../../components/Button';

export default function ShowPet() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('token'));

  const navigate = useNavigate();
  const { id } = useParams();

  async function schedule() {
    await api
      .patch(`/pets/schedule/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate('/');
        return response.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  useEffect(() => {
    api
      .get(`/pets/${id}`)
      .then((response) => {
        setPet(response.data.pet);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [id]);

  return (
    <Container>
      <Title text={`Conheça o pet: ${pet.name}`} />
      <ImageContainer>
        {pet.images &&
          pet.images.map((image, index) => (
            <img src={`${process.env.REACT_APP_API_URL}/images/pets/${image}`} key={`${pet.name}+${index}`} alt="Imagem do Pet" />
          ))}
      </ImageContainer>
      <ContainerDetails>
        <ul>
          <li>Nome: {pet.name}</li>
          <li>Idade: {pet.age}</li>
          <li>Peso: {pet.weight}</li>
          <li>Dono: {get(pet, 'user.name', '') ? pet.user.name : ''}</li>
        </ul>
        {token ? (
          <Button onClick={() => schedule()} text="Solicitar visita" />
        ) : (
          <p>
            Você precisa <Link to="/register">criar uma conta</Link> para solicitar visita.
          </p>
        )}
      </ContainerDetails>
    </Container>
  );
}
