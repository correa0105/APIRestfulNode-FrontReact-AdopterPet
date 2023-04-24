import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../utils/api';

import { Container } from '../../styles/GlobalStyles';
import Title from '../../components/Title';
import RoundedImg from '../../components/RoundedImg';

import { ContainerPets } from './styled';

export default function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token' || ''));

  useEffect(() => {
    api
      .get('/pets/myadoptions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
        return response.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [token]);

  return (
    <Container>
      <ContainerPets>
        <Title text="Minhas adoções" />
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
        <section>
          {pets.length > 0 &&
            pets.map((pet) => (
              <div className="containerPet" key={pet._id}>
                <RoundedImg src={`${process.env.REACT_APP_API_URL}/images/pets/${pet.images[0]}`} alt="Imagem do Pet" />
                <span>{pet.name}</span>
                <div>
                  <span>Cor: {pet.color}</span>
                  <span>Idade: {pet.age} anos</span>
                  <span>Peso: {pet.weight}kg</span>
                  {pet.avaible ? (
                    <section>
                      <p>Adoção em processo</p>
                      <span>Ligue para: {pet.user.phone}</span>
                      <span>Fale com: {pet.user.name}</span>
                    </section>
                  ) : (
                    <p>Adoção concluída</p>
                  )}
                </div>
              </div>
            ))}
          {pets.length === 0 && <p>Não há pets cadastrados ou disponiveis para adoção no momento!</p>}
        </section>
      </ContainerPets>
    </Container>
  );
}
