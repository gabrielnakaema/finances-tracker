import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Header from './components/Header';
import { signUp } from './services/auth';
import { fetchAllEntries, addEntry, deleteEntry } from './services/entries';
import { Entry, NewEntry, NewUser } from './types';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState<Entry[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (authContext.isSignedIn) {
      const fetchEntries = async () => {
        const entries = (await fetchAllEntries()) as Entry[];
        setData(entries);
      };
      fetchEntries();
    }
  }, [authContext]);

  const handleSignIn = async (username: string, password: string) => {
    await authContext.signIn(username, password);
    history.push('/');
  };

  const handleSignUp = async (newUser: NewUser) => {
    await signUp(newUser);
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
      <Switch>
        <Route path="/signin">
          <SignInForm handleSignIn={handleSignIn} />
        </Route>
        <Route path="/signup">
          <SignUpForm handleSignUp={handleSignUp} />
        </Route>
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
