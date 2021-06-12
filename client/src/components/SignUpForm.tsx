import { useTextField } from '../hooks/useTextField';
import TextInput from './TextInput';
import { NewUser } from '../types';
import { SyntheticEvent } from 'react';

interface SignUpFormProps {
  handleSignUp: (newUser: NewUser) => void;
}

const SignUpForm = (props: SignUpFormProps) => {
  const name = useTextField('text', () => '');
  const username = useTextField('text', () => '');
  const password = useTextField('password', () => '');

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isNameOk = !name.error && name.callValidation();
    const isUsernameOk = !username.error && username.callValidation();
    const isPasswordOk = !password.error && password.callValidation();
    if (!isUsernameOk || !isPasswordOk || !isNameOk) {
      return;
    }
    props.handleSignUp({
      name: name.value,
      username: username.value,
      password: password.value,
    });
    name.reset();
    username.reset();
    password.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        value={name.value}
        onChange={name.onChange}
        onBlur={name.onBlur}
        type={name.type}
        error={name.error}
        labelText="Name"
      />
      <TextInput
        value={username.value}
        onChange={username.onChange}
        onBlur={username.onBlur}
        type={username.type}
        error={username.error}
        labelText="Username"
      />
      <TextInput
        value={password.value}
        onChange={password.onChange}
        onBlur={password.onBlur}
        type={password.type}
        error={password.error}
        labelText="Password"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-300 p-3 text-white rounded w-1/2 block mx-auto font-medium"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
