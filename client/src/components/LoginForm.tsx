import React, { useState } from 'react';
import TextInput from './TextInput';

interface LoginFormProps {
  handleLogin: (username: string, password: string) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handleLogin(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          value={username}
          onChange={handleUsernameChange}
          labelText="Username"
          type="text"
          inputId="username-login-input"
        />
        <TextInput
          value={password}
          onChange={handlePasswordChange}
          labelText="Password"
          type="password"
          inputId="password-login-input"
        />
        <button
          type="submit"
          className="bg-blue-500 p-3 hover:bg-blue-300 text-white rounded w-1/2 block mx-auto font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
