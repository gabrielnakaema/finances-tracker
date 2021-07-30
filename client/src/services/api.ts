import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL as string;
const apiPort = process.env.REACT_APP_API_PORT as string;
const token = window.localStorage.getItem('userToken');

export const api = axios.create({
  baseURL: apiPort ? `${apiBaseUrl}:${apiPort}` : `${apiBaseUrl}`,
});

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}
