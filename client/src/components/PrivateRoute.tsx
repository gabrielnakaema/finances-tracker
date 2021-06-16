import { Route, Redirect } from 'react-router-dom';
import { useContext, ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  path: string;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      path={props.path}
      render={({ location }) => {
        if (auth.isSignedIn) {
          return props.children;
        } else {
          return (
            <Redirect to={{ pathname: 'signin', state: { from: location } }} />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
