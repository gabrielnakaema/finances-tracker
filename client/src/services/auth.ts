import { api } from './api';

interface LoginResponseObject {
  auth: boolean;
  token: string;
  user: {
    name: string;
    username: string;
  };
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponseObject | void> => {
  const response = await api.post(`/login`, {
    username,
    password,
  });
  if (response.data && response.status === 200) {
    return response.data as LoginResponseObject;
  } else {
    throw new Error(`${response.status}:${response.data.message}`);
  }
};

export const loginWithCache = async (
  token: string
): Promise<LoginResponseObject | void> => {
  if (!token) {
    return;
  }
  const response = await api.post(`/validatetoken`, {
    token,
  });
  if (response.data && response.status === 200) {
    return response.data as LoginResponseObject;
  } else {
    throw new Error(`${response.status}:${response.data.message}`);
  }
};
