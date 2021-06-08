import { useState, useEffect, useContext } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { Entry, NewEntry } from './types';
import { fetchAllEntries, addEntry, deleteEntry } from './services/entries';
import LoginForm from './components/LoginForm';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';

function App() {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState<Entry[]>([]);

  useEffect(() => {
    if (authContext.isSignedIn) {
      const fetchEntries = async () => {
        const entries = (await fetchAllEntries()) as Entry[];
        setData(entries);
      };
      fetchEntries();
    }
  }, [authContext.isSignedIn]);

  const handleLogin = async (username: string, password: string) => {
    await authContext.signIn(username, password);
  };

  const addNewEntry = async (newEntry: NewEntry): Promise<void> => {
    const receivedEntry = await addEntry(newEntry);
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
      addEntry(newEntry)
    );
    const addedEntries = await Promise.all(addedEntriesPromises);
    setData([...data, ...addedEntries]);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('do you really want to delete this entry ? ')) {
      const status = await deleteEntry(id);
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
      <Header />
      {authContext.isSignedIn ? (
        <div className="flex flex-col md:flex-row-reverse">
          <EntryForm addNewEntry={addNewEntry} addEntries={addEntries} />
          <EntryList data={data} handleDelete={handleDelete} />
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
