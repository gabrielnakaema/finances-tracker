import { useEffect, useContext, useReducer, useState } from 'react';
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
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const authContext = useContext(AuthContext);
  const { notification, changeNotification } = useContext(NotificationContext);
  const [data, dispatch] = useReducer(entriesReducer, []);
  const [areEntriesLoading, setAreEntriesLoading] = useState(true);
  const [isCheckingCache, setIsCheckingCache] = useState(true);

  useEffect(() => {
    const signInWithCache = async () => {
      try {
        await authContext.signInFromCache();
      } catch (error) {
        changeNotification({
          type: 'error',
          message: error.message,
        });
      } finally {
        setIsCheckingCache(false);
      }
    };
    signInWithCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authContext.user) {
      const fetchEntries = async () => {
        try {
          const entries = await fetchAllEntries();
          dispatch({
            type: 'SET_ENTRIES',
            payload: entries,
          });
          if (areEntriesLoading) {
            setAreEntriesLoading(false);
          }
        } catch (error) {
          changeNotification({
            type: 'error',
            message: error.message,
          });
        }
      };
      fetchEntries();
    }
  }, [authContext, changeNotification, areEntriesLoading]);

  const addEntries = async (newEntries: NewEntry[]) => {
    try {
      const response = await postEntries(newEntries);
      dispatch({
        type: 'ADD_ENTRIES',
        payload: response,
      });
      changeNotification({
        type: 'ok',
        message: 'Entry added succesfully.',
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
        changeNotification({
          type: 'ok',
          message: 'Entry deleted succesfully.',
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

  return (
    <div className="h-screen">
      <Header />
      <NotificationMessage notification={notification} />
      {isCheckingCache ? (
        <div className="flex flex-col items-center justify-center h-full">
          <LoadingSpinner className="sm:w-24 sm:h-24" />
          Loading...
        </div>
      ) : (
        <Switch>
          <Route path="/signin">
            {authContext.user ? <Redirect to="/entries" /> : <SignInForm />}
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route exact path="/">
            <Redirect to="/entries" />
          </Route>
          <PrivateRoute path="/entries">
            <div className="flex flex-col md:flex-row-reverse">
              <EntryForm addEntries={addEntries} />
              <EntryList
                data={data}
                handleDelete={handleDelete}
                isLoading={areEntriesLoading}
              />
            </div>
          </PrivateRoute>
        </Switch>
      )}
    </div>
  );
}

export default App;
