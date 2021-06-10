import { createContext, ReactNode, useEffect, useState } from 'react';
import { login, loginWithCache } from '../services/auth';
import { api } from '../services/api';

interface User {
  name: string;
  username: string;
}

interface AuthContextInfo {
  isSignedIn: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  user: User | null;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextInfo);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const isSignedIn = !!user;
  useEffect(() => {
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
          console.log(error);
        }
      }
    };
    signInFromCache();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      if (response) {
        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
        window.localStorage.setItem('userToken', response.token);
        setUser(response.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    window.localStorage.setItem('userToken', '');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
