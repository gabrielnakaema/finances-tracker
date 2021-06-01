import { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { Entry, NewEntry } from './types';
import { logout } from './utils';
import { login, loginWithCache } from './services/auth';
import { fetchAllEntries, addEntry, deleteEntry } from './services/api';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState('');
  const [data, setData] = useState<Entry[]>([]);

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

  const addNewEntry = async (newEntry: NewEntry): Promise<void> => {
    const receivedEntry = await addEntry(token, newEntry);
    if (receivedEntry) {
      if (data) {
        const newDataArray = [...data, receivedEntry];
        setData(newDataArray);
      } else {
        setData([receivedEntry]);
      }
    }
  };

  const addEntries = async (newEntries: NewEntry[]) => {
    const addedEntriesPromises = newEntries.map((newEntry) =>
      addEntry(token, newEntry)
    );
    const addedEntries = await Promise.all(addedEntriesPromises);
    setData([...data, ...addedEntries]);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('do you really want to delete this entry ? ')) {
      const status = await deleteEntry(token, id);
      if (status === 200) {
        const updatedData = data.filter((entry) => entry._id !== id);
        setData(updatedData);
      } else {
        console.log('unable to delete');
        return;
      }
    } else {
      return;
    }
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
            <EntryList data={data} handleDelete={handleDelete} />
          </div>
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
