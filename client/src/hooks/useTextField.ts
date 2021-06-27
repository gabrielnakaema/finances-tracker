import { useState, ChangeEvent, FocusEvent } from 'react';

interface TextFieldHookReturn {
  value: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error: string;
  reset: () => void;
  callValidation: () => boolean;
}

export const useTextField = (
  type: string,
  validate: (text: string) => string,
  defaultValue?: string
): TextFieldHookReturn => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '');
  const [error, setError] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
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

  const callValidation = (): boolean => {
    const errorFromNewValidation = validate(value);
    if (errorFromNewValidation) {
      setError(errorFromNewValidation);
      return false;
    }
    return true;
  };

  const reset = () => {
    setValue('');
    setError('');
  };

  return { value, onChange, type, onBlur, error, reset, callValidation };
};
