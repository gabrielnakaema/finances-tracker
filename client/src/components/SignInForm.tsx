import React from 'react';
import TextInput from './TextInput';
import { validateUsername, validatePassword } from '../utils/validation';
import { useTextField } from '../hooks/useTextField';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const SignInForm = () => {
  const username = useTextField('text', validateUsername);
  const password = useTextField('password', validatePassword);
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isUsernameOk = !username.error && username.callValidation();
    const isPasswordOk = !password.error && password.callValidation();
    if (!isUsernameOk || !isPasswordOk) {
      return;
    }

    await authContext.signIn(username.value, password.value);
  };

  return (
    <div>
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
        <button
          type="submit"
          className="bg-blue-500 p-3 hover:bg-blue-300 text-white rounded w-1/2 block mx-auto font-medium"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
