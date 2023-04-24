import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import MyPets from '../pages/MyPets';
import RegisterPet from '../pages/RegisterPet';
import EditPet from '../pages/EditPet';
import ShowPet from '../pages/ShowPet';
import MyAdoptions from '../pages/MyAdoptions';

export default function ContainerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users/profile" element={<Profile />} />
      <Route path="/pets/mypets" element={<MyPets />} />
      <Route path="/pets/add" element={<RegisterPet />} />
      <Route path="/pets/edit/:id" element={<EditPet />} />
      <Route path="/pets/:id" element={<ShowPet />} />
      <Route path="/pets/myadoptions" element={<MyAdoptions />} />
    </Routes>
  );
}
