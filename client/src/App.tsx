import { useEffect, useContext, useReducer } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import PrivateRoute from './components/PrivateRoute';
import { fetchAllEntries, postEntries, deleteEntry } from './services/entries';
import { NewEntry } from './types';
import NotificationMessage from './components/NotificationMessage';
import { entriesReducer } from './reducers/entries';
import { NotificationContext } from './contexts/NotificationContext';

function App() {
  const authContext = useContext(AuthContext);
  const { notification, changeNotification } = useContext(NotificationContext);
  const [data, dispatch] = useReducer(entriesReducer, []);

  useEffect(() => {
    if (authContext.isSignedIn) {
      const fetchEntries = async () => {
        try {
          const entries = await fetchAllEntries();
          dispatch({
            type: 'SET_ENTRIES',
            payload: entries,
          });
        } catch (error) {
          changeNotification({
            type: 'error',
            message: error.message,
          });
        }
      };
      fetchEntries();
    }
  }, [authContext, changeNotification]);

  const addEntries = async (newEntries: NewEntry[]) => {
    try {
      const response = await postEntries(newEntries);
      dispatch({
        type: 'ADD_ENTRIES',
        payload: response,
      });
    } catch (error) {
      changeNotification({
        type: 'error',
        message: error.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Do you really want to delete this entry ? ')) {
      try {
        await deleteEntry(id);
        dispatch({
          type: 'REMOVE_ENTRY',
          payload: {
            entryId: id,
          },
        });
      } catch (error) {
        changeNotification({
          type: 'error',
          message: error.message,
        });
      }
    } else {
      return;
    }
  };

  const changeError = (message: string) => {
    changeNotification({
      type: 'error',
      message,
    });
  };

  return (
    <>
      <Header />
      <NotificationMessage notification={notification} />
      <Switch>
        <Route path="/signin">
          <SignInForm changeError={changeError} />
        </Route>
        <Route path="/signup">
          <SignUpForm changeError={changeError} />
        </Route>
        <Route exact path="/">
          <Redirect to="/entries" />
        </Route>
        <PrivateRoute path="/entries">
          <div className="flex flex-col md:flex-row-reverse">
            <EntryForm addEntries={addEntries} />
            <EntryList data={data} handleDelete={handleDelete} />
          </div>
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
