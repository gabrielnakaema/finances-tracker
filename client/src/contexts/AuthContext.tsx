import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { NotificationContext } from './NotificationContext';
import { login, loginWithCache } from '../services/auth';
import { api } from '../services/api';
import { User } from '../types';

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
  const history = useHistory();
  const notificationContext = useContext(NotificationContext);
  const isSignedIn = !!user;
  useEffect(() => {
    const signInFromCache = async () => {
      const token = window.localStorage.getItem('userToken');
      if (token) {
        try {
          const response = await loginWithCache(token);
          if (response) {
            setUser(response.user);
            history.push('/');
          }
        } catch (error) {
          window.localStorage.setItem('userToken', '');
          notificationContext.changeNotification({
            type: 'error',
            message: error.message,
          });
        }
      }
    };
    signInFromCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (username: string, password: string) => {
    const response = await login(username, password);
    if (response) {
      api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
      window.localStorage.setItem('userToken', response.token);
      setUser(response.user);
      history.push('/');
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
