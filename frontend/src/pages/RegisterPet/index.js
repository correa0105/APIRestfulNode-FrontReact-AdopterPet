import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../utils/api';

import { Container } from '../../styles/GlobalStyles';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Form, InputColor, ImageContainer } from './styled';

export default function RegisterPet() {
  const [pet, setPet] = useState({});
  const [preview, setPreview] = useState([]);
  const [token] = useState(localStorage.getItem('token'));

  const navigate = useNavigate();

  const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado'];

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: [e.target.value] });
  }

  function handleFileChange(e) {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  }

  function handleColor(e) {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    await api
      .post('/pets/create', formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Pet cadastrado com sucesso!');
        navigate('/pets/mypets');
        return response.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <Container>
      <Title text="Cadastrando pet" />
      <ImageContainer>
        {preview.length > 0
          ? preview.map((image, index) => <img src={URL.createObjectURL(image)} key={`${pet.name}+${index}`} alt="Imagem do Pet" />)
          : pet.images &&
            pet.images.map((image, index) => (
              <img src={`${process.env.REACT_APP_API_URL}/images/pets/${image}`} key={`${pet.name}+${index}`} alt="Imagem do Pet" />
            ))}
      </ImageContainer>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          text="Nome"
          idInput="name"
          name="name"
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Digite o nome da pet"
        />
        <Input
          text="Idade"
          idInput="age"
          name="age"
          onChange={(e) => handleChange(e)}
          type="number"
          placeholder="Digite a idade do pet"
        />
        <Input
          text="Peso"
          idInput="weight"
          name="weight"
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Digite o peso do pet"
        />
        <InputColor htmlFor="color">
          <span>Cor</span>
          <select name="color" id="color" onChange={(e) => handleColor(e)}>
            <option>Selecione uma opção</option>
            {colors.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </InputColor>
        <Input text="Imagem" idInput="images" name="images" onChange={(e) => handleFileChange(e)} type="file" multiple />
        <Button type="submit" text="Cadastrar Pet" />
      </Form>
    </Container>
  );
}
