import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_BASE_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/sign-up`, userData);
};

export const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_BASE_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
