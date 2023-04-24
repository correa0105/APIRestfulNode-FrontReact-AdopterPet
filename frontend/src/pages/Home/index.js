import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../utils/api';

import { Container } from '../../styles/GlobalStyles';
import Title from '../../components/Title';
import RoundedImg from '../../components/RoundedImg';

import { ContainerPets } from './styled';

export default function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api
      .get('/pets')
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <Container>
      <ContainerPets>
        <Title text="Adote um pet" />
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
                  {pet.avaible ? <Link to={`/pets/${pet._id}`}>Mais detalhes</Link> : <p>Adotado</p>}
                </div>
              </div>
            ))}
          {pets.length === 0 && <p>Não há pets cadastrados ou disponiveis para adoção no momento!</p>}
        </section>
      </ContainerPets>
    </Container>
  );
}
