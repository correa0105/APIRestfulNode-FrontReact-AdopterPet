import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../utils/api';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function authUser(data) {
    setAuthenticated(true);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    localStorage.setItem('token', JSON.stringify(data.token));
    navigate('/');
  }

  async function register(user) {
    try {
      const data = await api.post('users/register', user).then((response) => {
        return response.data;
      });

      await authUser(data);
      toast.success('Cadastro realizado com sucesso!');
    } catch (err) {
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      }
    }
  }

  async function login(user) {
    try {
      const data = await api.post('/users/login', user).then((response) => {
        return response.data;
      });

      await authUser(data);
      toast.success('Você logou com sucesso!');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  function logout() {
    setAuthenticated(false);
    toast.success('Você saiu do sistema!');
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
  }

  return { register, login, logout, authenticated };
}
