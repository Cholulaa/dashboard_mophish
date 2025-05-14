import axios from 'axios';

// Base API publique Render
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/check-auth');
    return response.data.authenticated;
  } catch (error) {
    return false;
  }
};

export const getEmails = async () => {
  const response = await api.get('/emails');
  return response.data;
};

export const importEmails = async (emails: { address: string }[]) => {
  const response = await api.post('/emails/import', emails);
  return response.data;
};

export const deleteAllEmails = async () => {
  const response = await api.delete('/emails');
  return response.data;
};

export const getCredentials = async () => {
  const response = await api.get('/credentials');
  return response.data;
};

export const addCredential = async (credential: {
  email: string;
  username: string;
  captured_at: string;
}) => {
  const response = await api.post('/credentials', credential);
  return response.data;
};
