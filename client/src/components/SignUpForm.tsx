import { useTextField } from '../hooks/useTextField';
import TextInput from './TextInput';
import { signUp } from '../services/auth';
import { validateUsername, validatePassword } from '../utils/validation';
import Button from './Button';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const SignUpForm = () => {
  const name = useTextField('text', (text: string) =>
    text ? '' : 'Must not be empty.'
  );
  const username = useTextField('text', validateUsername);
  const password = useTextField('password', validatePassword);
  const history = useHistory();
  const { changeNotification } = useContext(NotificationContext);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
      changeNotification({
        type: 'ok',
        message: 'Succesfully created user, please sign in !',
      });
      name.reset();
      username.reset();
      password.reset();
      history.push('/');
    } catch (error) {
      changeNotification({
        type: 'error',
        message: error.message,
      });
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
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
