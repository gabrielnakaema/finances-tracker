import { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { Entry, NewEntry } from './types';
import { login, loginWithCache, logout } from './utils';
import { fetchAllEntries, addEntry } from './services/api';
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
    if (token) {
      const fetchEntries = async () => {
        const entries = (await fetchAllEntries(token)) as Entry[];
        setData(entries);
      };
      fetchEntries();
    }
  }, [token]);

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

  const handleLogout = () => {
    logout();
    setToken('');
    setData([]);
  };

  const addNewEntry = async (newEntry: NewEntry) => {
    const receivedEntry = await addEntry(token, newEntry);
    if (data) {
      setData([...data, receivedEntry]);
    } else {
      setData([receivedEntry]);
    }
  };

  const addEntries = async (newEntries: NewEntry[]) => {
    const addedEntriesPromises = newEntries.map((newEntry) =>
      addEntry(token, newEntry)
    );
    const addedEntries = await Promise.all(addedEntriesPromises);
    setData([...data, ...addedEntries]);
  };

  return (
    <>
      {token ? (
        <div>
          <header className="flex flex-row justify-between items-center bg-blue-500 p-3">
            <h1 className="font-bold text-white tracking-wide">
              Finances Tracker
            </h1>
            <button
              className="bg-red-600 text-white px-3 rounded font-bold"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </header>
          <div className="w-full text-center md:w-1/2 m-auto">
            <EntryForm addNewEntry={addNewEntry} addEntries={addEntries} />
            <EntryList data={data} />
          </div>
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
