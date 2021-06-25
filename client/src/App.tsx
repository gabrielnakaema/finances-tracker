import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import PrivateRoute from './components/PrivateRoute';
import { fetchAllEntries, addEntry, deleteEntry } from './services/entries';
import { Entry, NewEntry } from './types';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState<Entry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authContext.isSignedIn) {
      const fetchEntries = async () => {
        const entries = (await fetchAllEntries()) as Entry[];
        setData(entries);
      };
      fetchEntries();
    }
  }, [authContext]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

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

  const changeError = (message: string) => {
    setError(message);
  };

  return (
    <>
      <Header />
      <ErrorMessage message={error} />
      <Switch>
        <Route path="/signin">
          <SignInForm changeError={changeError} />
        </Route>
        <Route path="/signup">
          <SignUpForm changeError={changeError} />
        </Route>
        changeError
        <Route exact path="/">
          <Redirect to="/entries" />
        </Route>
        <PrivateRoute path="/entries">
          <div className="flex flex-col md:flex-row-reverse">
            <EntryForm addNewEntry={addNewEntry} addEntries={addEntries} />
            <EntryList data={data} handleDelete={handleDelete} />
          </div>
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
