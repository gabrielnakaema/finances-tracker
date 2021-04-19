import { useState } from 'react';

interface NewEntry {
  value: number;
  description: string;
}

interface EntryFormProps {
  addNewEntry: (newEntry: NewEntry) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const newEntry = {
      value: Number(value),
      description,
    };
    props.addNewEntry(newEntry);
    setValue('');
    setDescription('');
  };

  return (
    <>
      <h2>Add New Entry</h2>
      Value
      <input
        value={value}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
      />
      Description
      <input
        value={description}
        onChange={(e) => {
          e.preventDefault();
          setDescription(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Create</button>
    </>
  );
};

export default EntryForm;
