import TextInput from './TextInput';
import { validateUsername, validatePassword } from '../utils/validation';
import { useTextField } from '../hooks/useTextField';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { Link } from 'react-router-dom';
import Button from './Button';

const SignInForm = () => {
  const username = useTextField('text', validateUsername);
  const password = useTextField('password', validatePassword);
  const authContext = useContext(AuthContext);
  const { changeNotification } = useContext(NotificationContext);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isUsernameOk = !username.error && username.callValidation();
    const isPasswordOk = !password.error && password.callValidation();
    if (!isUsernameOk || !isPasswordOk) {
      return;
    }
    try {
      await authContext.signIn(username.value, password.value);
    } catch (error) {
      changeNotification({
        type: 'error',
        message: error.message,
      });
    }
  };

  const testLogin = async () => {
    const USERNAME = process.env.REACT_APP_TESTING_USERNAME;
    const PASSWORD = process.env.REACT_APP_TESTING_PASSWORD;
    if (USERNAME && PASSWORD) {
      try {
        await authContext.signIn(USERNAME, PASSWORD);
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
    <div className="sm:w-1/2 sm:mx-auto lg:w-1/4">
      <form onSubmit={handleSubmit}>
        <TextInput
          value={username.value}
          onChange={username.onChange}
          onBlur={username.onBlur}
          labelText="Username"
          type="text"
          inputId="username-login-input"
          error={username.error}
        />
        <TextInput
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          labelText="Password"
          type="password"
          inputId="password-login-input"
          error={password.error}
        />
        <Button type="submit">Sign In</Button>
      </form>
      {process.env.REACT_APP_TESTING_USERNAME &&
      process.env.REACT_APP_TESTING_PASSWORD ? (
        <Button className="mt-1" onClick={testLogin}>
          Sign in with demo user
        </Button>
      ) : (
        <></>
      )}
      <div className="text-center mt-5">
        <span className=" text-gray-700">Don't have an account ? </span>
        <Link className="text-blue-500 underline" to="/signup">
          Sign Up!
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
