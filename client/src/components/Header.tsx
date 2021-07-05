import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BiUserCircle } from 'react-icons/bi';

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
      {authContext.user ? (
        <HeaderUser user={authContext.user} handleSignOut={handleSignOut} />
      ) : (
        <></>
      )}
    </header>
  );
};

interface HeaderUserProps {
  user: User | null;
  handleSignOut: () => void;
  className?: string;
}

const HeaderUser = (props: HeaderUserProps) => {
  const [open, setOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen(!open);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (node.current) {
      if (node.current.contains(e.target as Node)) {
        return;
      } else {
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);

  return (
    <div ref={node}>
      <button tabIndex={0} onClick={toggle} className="flex align-middle">
        <BiUserCircle size={'1.75rem'} color="white" />
        <IoMdArrowDropdown size="1.75rem" color="white" />
      </button>
      {open ? (
        <div className="absolute mt-0.5 right-0 left-auto mr-3 rounded bg-white border shadow-md">
          <div className="whitespace-nowrap p-3">
            Signed in as
            <br />
            <span className="font-bold text-gray-700">
              {props.user?.username}
            </span>
          </div>
          <button
            className="text-left border-t-2 w-full p-3 hover:bg-gray-50"
            onClick={props.handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
