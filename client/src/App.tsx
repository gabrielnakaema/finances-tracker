import { mockData } from './mockData';
import { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { Entry, NewEntry } from './types';
import { login, loginWithCache } from './utils';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  const [data, setData] = useState<Entry[]>([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!token) {
      const login = async () => {
        const cachedToken = await loginWithCache();
        if (cachedToken) {
          setToken(cachedToken);
        }
      };
      login();
    }
  }, [token]);

  useEffect(() => {
    setData(mockData);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const receivedToken = await login(username, password);
      if (receivedToken) {
        window.localStorage.setItem('userToken', receivedToken);
        setToken(receivedToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNewEntry = (newEntry: NewEntry) => {
    if (data) {
      setData([
        ...data,
        {
          id: data.length + 1,
          ...newEntry,
        },
      ]);
    } else {
      setData([
        {
          id: 1,
          ...newEntry,
        },
      ]);
    }
  };

  const addEntries = (newEntries: NewEntry[]) => {
    setData([
      ...data,
      ...newEntries.map((el, index) => ({
        ...el,
        id: data.length + 1 + index,
      })),
    ]);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {token ? <h1>Logged In</h1> : <LoginForm handleLogin={handleLogin} />}
      <h1>Finances Tracker</h1>
      <EntryForm addNewEntry={addNewEntry} addEntries={addEntries} />
      <EntryList data={data} />
    </div>
  );
}

export default App;
