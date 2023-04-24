import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../utils/api';

import { Container } from '../../styles/GlobalStyles';
import Button from '../../components/Button';
import Title from '../../components/Title';
import RoundedImg from '../../components/RoundedImg';

import { ContainerMyPets } from './styled';

export default function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  const navigate = useNavigate();

  async function removePet(id) {
    await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);
        toast.success('Pet removido com sucesso!');
        return response.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  async function concludeAdoption(id) {
    await api
      .patch(`/pets/conclude/${id}`, {
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
      .get('/pets/mypets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [token]);

  return (
    <Container>
      <ContainerMyPets>
        <Title text="Meus Pets" />
        <Link to="/pets/add">
          <Button text="Cadastrar Pet" />
        </Link>
        <div>
          {pets.length > 0 && <p>Meus pets cadastrados:</p>}
          {pets.length === 0 && <p>Não há pets cadastrados!</p>}
        </div>
        <section>
          {pets.map((pet) => {
            return (
              <div key={pet._id}>
                <RoundedImg src={`${process.env.REACT_APP_API_URL}/images/pets/${pet.images[0]}`} alt="Imagem do Pet" />
                <span>{pet.name}</span>
                <span>
                  {pet.avaible ? (
                    <>
                      {pet.adopter && <Button onClick={() => concludeAdoption(pet._id)} text="Concluir Adoção" />}
                      <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                      <Button text="Excluir" onClick={() => removePet(pet._id)} />
                    </>
                  ) : (
                    <p>Pet já adotado</p>
                  )}
                </span>
              </div>
            );
          })}
        </section>
      </ContainerMyPets>
    </Container>
  );
}
