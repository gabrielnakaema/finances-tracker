import { useTextField } from '../hooks/useTextField';
import TextInput from './TextInput';
import { SyntheticEvent, useState } from 'react';
import { signUp } from '../services/auth';
import { validateUsername, validatePassword } from '../utils/validation';
import ErrorMessage from './ErrorMessage';
import Button from './Button';

const SignUpForm = () => {
  const name = useTextField('text', (text: string) =>
    text ? '' : 'Must not be empty.'
  );
  const username = useTextField('text', validateUsername);
  const password = useTextField('password', validatePassword);
  const [error, setError] = useState('');

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isNameOk = !name.error && name.callValidation();
    const isUsernameOk = !username.error && username.callValidation();
    const isPasswordOk = !password.error && password.callValidation();
    if (!isUsernameOk || !isPasswordOk || !isNameOk) {
      return;
    }
    try {
      await signUp({
        name: name.value,
        username: username.value,
        password: password.value,
      });
      name.reset();
      username.reset();
      password.reset();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="sm:w-1/2 sm:mx-auto lg:w-1/4" onSubmit={handleSubmit}>
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
      <ErrorMessage message={error} />
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
