import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const authContext = useContext(AuthContext);

  const handleSignOut = () => {
    authContext.signOut();
  };

  return (
    <header className="flex flex-row justify-between items-center bg-blue-500 p-3">
      <Link to="/">
        <h1 className="font-bold text-white tracking-wide">Finances Tracker</h1>
      </Link>
      {authContext.isSignedIn ? (
        <button
          className="bg-red-600 text-white px-3 rounded font-bold"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
