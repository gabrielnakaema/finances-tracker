import { createContext, ReactNode, useState } from 'react';
import { login, loginWithCache } from '../services/auth';
import { api } from '../services/api';
import { User } from '../types';

interface AuthContextInfo {
  signIn: (username: string, password: string) => Promise<void>;
  signInFromCache: () => Promise<void>;
  user: User | null;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextInfo);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signInFromCache = async () => {
    const token = window.localStorage.getItem('userToken');
    if (token) {
      try {
        const response = await loginWithCache(token);
        if (response) {
          setUser(response.user);
        }
      } catch (error) {
        window.localStorage.setItem('userToken', '');
      }
    }
  };

  const signIn = async (username: string, password: string) => {
    const response = await login(username, password);
    if (response) {
      api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
      window.localStorage.setItem('userToken', response.token);
      setUser(response.user);
    }
  };

  const signOut = () => {
    window.localStorage.setItem('userToken', '');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signInFromCache }}>
      {children}
    </AuthContext.Provider>
  );
};
