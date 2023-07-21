import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Replace with your backend URL

export const createHost = (hostData) => {
  return axios.post(`${API_BASE_URL}/host/signup`, hostData);
};

export const loginHost = (loginData) => {
  return axios.post(`${API_BASE_URL}/host/login`, loginData);
};

export const getAllHosts = () => {
  return axios.get(`${API_BASE_URL}/hosts`);
};

export const getHostById = (id) => {
  return axios.get(`${API_BASE_URL}/hosts/${id}`);
};

export const updateHost = (id, hostData) => {
  return axios.put(`${API_BASE_URL}/hosts/${id}`, hostData);
};

export const deleteHost = (id) => {
  return axios.delete(`${API_BASE_URL}/hosts/${id}`);
};
