import { useState, ChangeEvent, FocusEvent } from 'react';

interface TextFieldHookReturn {
  value: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error: string;
  reset: () => void;
}

export const useTextField = (
  type: string,
  validate: (text: string) => string
): TextFieldHookReturn => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const fieldValue = event.target.value;
    if (!fieldValue) {
      if (error) {
        setError('');
      }
      return;
    }
    const message = validate(fieldValue);
    if (message) {
      setError(message);
    } else {
      if (error) {
        setError('');
      }
    }
  };

  const reset = () => {
    setValue('');
    setError('');
  };

  return { value, onChange, type, onBlur, error, reset };
};
