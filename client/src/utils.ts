import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL as string;
const apiPort = process.env.REACT_APP_API_PORT as string;

export const login = async (
  username: string,
  password: string
): Promise<string | void> => {
  const response = await axios.post(`http://${apiBaseUrl}:${apiPort}/login`, {
    username,
    password,
  });
  if (response.data.token && response.status === 200) {
    return response.data.token;
  } else {
    throw new Error(`${response.status}:${response.data.message}`);
  }
};

export const loginWithCache = () => {
  const cachedToken = window.localStorage.getItem('userToken');
  return cachedToken;
};
