import React from 'react';

interface TextInputProps {
  inputId?: string;
  labelText: string;
  className?: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
}

const TextInput = (props: TextInputProps) => {
  return (
    <div className="m-3">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor={props.inputId}
      >
        {props.labelText}
      </label>
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight
                  focus:outline-none focus:bg-white focus:border-blue-500"
        id={props.inputId}
        type={props.type}
        min={props.min}
        value={props.value}
        onChange={props.onChange}
      ></input>
    </div>
  );
};

export default TextInput;
