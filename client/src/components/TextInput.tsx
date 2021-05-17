import React from 'react';

interface TextInputProps {
  inputId?: string;
  labelText: string;
  className?: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  inputStyle?: React.CSSProperties;
}

const TextInput = (props: TextInputProps) => {
  return (
    <div>
      <label htmlFor={props.inputId}>{props.labelText}</label>
      <br />
      <input
        id={props.inputId}
        className={props.className}
        type={props.type}
        min={props.min}
        value={props.value}
        onChange={props.onChange}
        style={{ ...props.inputStyle }}
      ></input>
    </div>
  );
};

export default TextInput;
